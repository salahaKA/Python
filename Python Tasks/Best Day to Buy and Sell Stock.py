while True:
    try:
        n_days = int(input("Enter number of days:"))
        break
    except ValueError:
        print("Invalid")
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

def max_profit(prices):
    if not prices:
        return 0
    min_price = prices[0]
    min_day, max_profit, buy_day, sell_day = 0, 0, 0, 0
    for i in range (1, len(prices)):
        if(prices[i] < min_price):
            min_price = prices[i]
            min_day = i
        current_profit = prices[i] - min_price
        if(current_profit > max_profit):
            max_profit = current_profit
            buy_day = min_day
            sell_day = i
    return max_profit, buy_day, sell_day

max_profit, buy_day, sell_day = max_profit(prices)

if(max_profit > 0):
    print("Buying day =>", buy_day+1)
    print("Selling day =>", sell_day+1)
    print("Profit=>", max_profit)
    
