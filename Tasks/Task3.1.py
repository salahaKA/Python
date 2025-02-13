day_price = [7,1,5,3,6,4]


buy_day = int(input("Enter the buying day: "))
sell_day = int(input("Enter the selling day: "))

for i in range(len(day_price)):
    if sell_day >= buy_day:
        profit = day_price[sell_day-1] - day_price[buy_day-1]
    else:
        print("Invalid input")
        break
print("Profit: ", profit)




# def maxProfit(prices):
#     max_profit = 0
#     for i in range(1,len(prices)):
#         if prices[i] > prices[i-1]:
#             max_profit += prices[i] - prices[i-1]
#     return max_profit

# print(maxProfit(n_days))


# Output:

# Buying days: 2
# Selling days: 5
# Profit: 7


