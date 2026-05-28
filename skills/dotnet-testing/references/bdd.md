# BDD — Behavior-Driven Development

> **Quick Ref**: Reqnroll (MIT) replaces SpecFlow | Given/When/Then = Arrange/Act/Assert | Scenarios test behavior not implementation | BDD ≠ just tool syntax — it's a collaboration pattern | Lightweight BDD: xUnit + descriptive method names | Don't BDD CRUD — use for business rules |

**Version assumptions:** .NET 8.0+ baseline. Reqnroll 2.x (MIT, SpecFlow successor). xUnit v3 for lightweight BDD.

## Core Principles

1. **BDD is about shared understanding, not tool syntax.** The Given/When/Then format is a communication tool between devs, QA, and business. If you only use it in C# attributes without a conversation, you're not doing BDD.

2. **Reqnroll over SpecFlow.** SpecFlow went commercial. Reqnroll is the MIT fork — drop-in replacement, same syntax, free forever.

3. **Not every test needs BDD.** CRUD operations don't need Given/When/Then. BDD shines for business rules, state transitions, and workflows with preconditions.

4. **Lightweight BDD works for most teams.** If full Reqnroll is too heavy, use xUnit with descriptive method names following Given/When/Then convention.

## Patterns (GOOD)

### Pattern 1: Reqnroll with Testcontainers (full BDD)

```csharp
// Checkout.feature
Feature: Checkout
  As a customer
  I want to complete my purchase
  So that I receive my order

Scenario: Apply discount code to order
  Given a customer with items in their cart totaling $100
  And a valid discount code "SAVE20" for 20% off
  When the customer applies the discount code
  Then the order total should be $80
  And the discount should be recorded on the order

// CheckoutSteps.cs
[Binding]
public sealed class CheckoutSteps
{
    private readonly AppDbContext _db;
    private Order _order = null!;
    private decimal _result;

    public CheckoutSteps(AppDbContext db) => _db = db;

    [Given(@"a customer with items in their cart totaling \$(\d+)")]
    public async Task GivenCustomerWithCart(decimal total)
    {
        var customer = new Customer { Id = Guid.NewGuid() };
        _db.Customers.Add(customer);
        var product = new Product { Name = "Widget", Price = total };
        _db.Products.Add(product);
        await _db.SaveChangesAsync();
    }

    [Given(@"a valid discount code ""(.+)"" for (\d+)% off")]
    public async Task GivenDiscountCode(string code, int percent)
    {
        _db.Discounts.Add(new Discount
        {
            Code = code,
            Percentage = percent,
            ValidUntil = DateTime.UtcNow.AddDays(1)
        });
        await _db.SaveChangesAsync();
    }

    [When(@"the customer applies the discount code")]
    public async Task WhenApplyDiscount()
    {
        var handler = new ApplyDiscountHandler(_db, TimeProvider.System);
        _result = await handler.ApplyAsync("SAVE20", orderTotal: 100m);
    }

    [Then(@"the order total should be \$(\d+)")]
    public void ThenOrderTotalShouldBe(decimal expected)
    {
        Assert.Equal(expected, _result);
    }
}
```

### Pattern 2: Lightweight BDD with xUnit (no framework)

```csharp
// Good: xUnit Facts with Given/When/Then naming convention.
// Works for teams that want BDD thinking without Reqnroll setup.

public sealed class OrderDiscountTests
{
    [Fact]
    public void Given_100_dollar_order_and_20_percent_code_When_applied_Then_total_is_80()
    {
        // Given
        var order = Order.Create(total: 100m);
        var discount = new Discount("SAVE20", 20, DateTime.UtcNow.AddDays(1));

        // When
        order.ApplyDiscount(discount);

        // Then
        Assert.Equal(80m, order.Total);
        Assert.Contains(discount, order.AppliedDiscounts);
    }

    [Fact]
    public void Given_expired_discount_code_When_applied_Then_rejected_with_error()
    {
        // Given
        var order = Order.Create(total: 100m);
        var expired = new Discount("OLD10", 10, DateTime.UtcNow.AddDays(-1));

        // When
        var result = order.ApplyDiscount(expired);

        // Then
        Assert.True(result.IsFailed);
        Assert.Contains("expired", result.Error);
    }
}
```

### Pattern 3: BDD for API integration tests

```csharp
// Given/When/Then in API tests with WebApplicationFactory + Testcontainers

public sealed class OrderCheckoutScenarios : IAsyncLifetime
{
    private readonly PostgreSqlContainer _db = new PostgreSqlBuilder().Build();
    private WebApplicationFactory<Program> _factory = null!;

    [Fact]
    public async Task Given_valid_order_When_checkout_Then_returns_confirmed_status()
    {
        // Given — seed the database with test data
        var client = _factory.CreateClient();
        var productId = await SeedProduct(client, "Widget", 29.99m);
        var cartId = await CreateCart(client, productId, quantity: 2);

        // When — perform the action
        var response = await client.PostAsJsonAsync($"/carts/{cartId}/checkout", new { });

        // Then — verify the outcome
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var order = await response.Content.ReadFromJsonAsync<Order>();
        Assert.Equal(OrderStatus.Confirmed, order!.Status);
        Assert.Equal(59.98m, order.Total);
    }

    public async Task InitializeAsync()
    {
        await _db.StartAsync();
        _factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(b => b.UseSetting("ConnectionStrings:Default", _db.GetConnectionString()));
    }

    public async Task DisposeAsync()
    {
        _factory?.Dispose();
        await _db.DisposeAsync();
    }
}
```

## Anti-patterns (BAD vs GOOD)

### 1. BDD for CRUD

```csharp
// BAD: Given/When/Then for a simple GET endpoint. No business rule to verify.
Scenario: Get order by ID
  Given an order exists with ID 123
  When I GET /orders/123
  Then the response status is 200
  And the response body contains ID 123

// GOOD: This doesn't need BDD. A simple integration test is sufficient.
[Fact]
public async Task GetOrder_ReturnsOrder()
{
    var response = await client.GetAsync("/orders/123");
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
}
```

### 2. Scenario too technical

```csharp
// BAD: Implementation detail leaked into scenario
Scenario: Save order to database
  Given a valid DbContext and an Order entity
  When SaveChangesAsync is called
  Then the Order table should contain one row

// GOOD: Business-readable scenario
Scenario: Customer places an order
  Given a customer has selected 3 items
  When they confirm the order
  Then a confirmation email is sent
  And inventory is reduced by 3
```

### 3. One scenario testing everything

```csharp
// BAD: Tests valid code, expired code, invalid code, missing code all in one
Scenario: Discount code handling
  Given various discount codes
  When they are applied
  Then various outcomes occur

// GOOD: Each scenario tests one business rule
Scenario: Apply valid discount code
Scenario: Reject expired discount code
Scenario: Reject already-used discount code
Scenario: Reject discount code with minimum order not met
```

### 4. Scenario outlines overused

```csharp
// BAD: Scenario outline for things that should be separate scenarios
Scenario Outline: Apply discount
  Given a discount code "<Code>"
  When applied to an order of $<Amount>
  Then the result is "<Result>"
Examples:
  | Code    | Amount | Result       |
  | SAVE20  | 100    | $80          |
  | EXPIRED | 100    | rejected     |
  | INVALID | 100    | rejected     |

// GOOD: Separate scenarios for different business rules.
// Valid, expired, and invalid are different business rules — they deserve their own scenarios.
// Scenario Outline is for variations of the SAME rule (e.g., different percentages).
Scenario Outline: Apply valid percentage discount
  Given a discount code "SAVE<Percent>" for <Percent>% off
  When applied to an order of $100
  Then the total is $<Expected>
Examples:
  | Percent | Expected |
  | 10      | 90       |
  | 20      | 80       |
  | 50      | 50       |
```

## Decision Guide

| Situation | Recommendation | Why |
|-----------|---------------|-----|
| Complex business rules (finance, legal, insurance) | Full Reqnroll + .feature files | Business needs to read and verify scenarios |
| Medium complexity, devs write tests | Lightweight BDD with xUnit | Given/When/Then thinking without framework overhead |
| Simple CRUD API | Just xUnit integration tests | BDD adds ceremony with no benefit |
| Microservice with clear boundaries | BDD for the service's core responsibility | Focus scenarios on the one thing this service owns |
| Cross-team collaboration (dev + QA + PM) | Reqnroll + living documentation | .feature files become shared source of truth |

## Cross-References

- [testing-strategy.md](testing-strategy.md) — When to use which test type (unit/integration/E2E)
- [integration-testing.md](integration-testing.md) — Testcontainers + WebApplicationFactory patterns
- [test-quality.md](test-quality.md) — Test smells, CRAP scores, coverage analysis
- [playwright.md](playwright.md) — E2E browser testing with Playwright
