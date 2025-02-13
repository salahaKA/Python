def max_profit(prices):
        if not prices:
            return 0
        min_price = prices[0]
        max_profit, buy_day, sell_day  = 0, 0, 0

        for i in range(1, len(prices)):
            if prices[i] < min_price:
                min_price = prices[i]
                min_day = i
            current_profit = prices[i] - min_price
            
            if current_profit > max_profit:
                max_profit = current_profit
                buy_day = min_day
                sell_day = i
        return max_profit, buy_day+1, sell_day+1

while True:
    try:
        n_days = int(input("Enetr number of days:"))
        break
    except Exception:
        print("Invalid, Enter valid days")
print(n_days)

prices = []
for i in range(n_days):
    while True:
        try:
            price = int(input("Enter price:"))
            prices.append(price)
            break
        except Exception:
            print("Please enter valid price")
print(prices)


profit, buy_day, sell_day = max_profit(prices)

if profit > 0:
    print("Buying days:", buy_day)
    print("Selling days:", sell_day)
    print("Profit:", profit)



