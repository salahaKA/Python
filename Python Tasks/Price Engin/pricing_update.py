import csv

def load_products(filename):
    products = {}
    with open(filename, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            sku = row['sku']
            products[sku] = {
                'name': row['name'],
                'current_price': float(row['current_price']),
                'cost_price': int(row['cost_price']),
                'stock': int(row['stock'])
            }
    return products

def load_sales(filename):
    sales = {}
    with open(filename, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            sku = row['sku']
            sales[sku] = int(row['quantity_sold'])
    return sales


def apply_pricing_rules(products, sales):
    updated_prices = []

    for sku, data in products.items():
        current_price = data['current_price']
        cost_price = data['cost_price']
        stock = data['stock']
        quantity_sold = sales.get(sku, 0)

        new_price = current_price  

        # Rule 1
        if stock < 20 and quantity_sold > 30:
            new_price = current_price * 1.15
        # Rule 2
        elif stock > 200 and quantity_sold == 0:
            new_price = current_price * 0.7
        # Rule 3
        elif stock > 100 and quantity_sold < 20:
            new_price = current_price * 0.9

        # Rule 4 
        min_price = cost_price * 1.2
        if new_price < min_price:
            new_price = min_price

        # Round final price
        new_price = round(new_price, 2)
        updated_prices.append({
            'sku': sku,
            'old_price': f"₹{round(current_price, 2)}",
            'new_price': f"₹{new_price}"
        })

    return updated_prices

def write_updated_prices(filename, data):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=['sku', 'old_price', 'new_price'])
        writer.writeheader()
        writer.writerows(data)

if __name__ == '__main__':
    products = load_products('products.csv')
    sales = load_sales('sales.csv')
    updated_prices = apply_pricing_rules(products, sales)
    write_updated_prices('updated_prices.csv', updated_prices)
    print("Updated prices written to updated_prices.csv")
