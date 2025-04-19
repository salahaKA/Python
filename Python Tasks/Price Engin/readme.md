# Price Update Script

## Overview

This script updates product prices based on inventory and sales data using specific pricing rules. It reads from:

- `products.csv`: Contains product pricing, cost, and stock info.
- `sales.csv`: Contains sales figures for the last 30 days.

## Pricing Rules

1. **Low Stock & High Demand**: stock < 20 AND quantity_sold > 30 → +15% price
2. **Dead Stock**: stock > 200 AND quantity_sold == 0 → -30% price
3. **Overstocked Inventory**: stock > 100 AND quantity_sold < 20 → -10% price
4. **Minimum Profit Margin**: Final price must be ≥ cost_price + 20%

## Output

Generates `updated_prices.csv` with:
- sku
- old_price (with ₹)
- new_price (with ₹)

## How to Run

```bash
python pricing_update.py
