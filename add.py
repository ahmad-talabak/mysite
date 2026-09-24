import json
print("=== اضافة منتج تاجر جديد ===")
name=input("اسم المنتج: ")
vendor=input("اسم التاجر: ")
cost=int(input("سعر التاجر (بشتري بي كم منو): "))
sell=int(input("سعر البيع للزبون: "))
comm=int(input("عمولتك انت: "))
t_comm=sell-cost-comm
print(f"\nالتاجر ح يربح: {t_comm}\nانت ح تربح: {comm}")

with open("products.json","r",encoding="utf-8") as f:
    data=json.load(f)

data.append({"id":len(data)+1,"name":name,"vendor":vendor,"cost":cost,"sell":sell,"comm":comm,"t_profit":t_comm,"profit":comm})

with open("products.json","w",encoding="utf-8") as f:
    json.dump(data,f,ensure_ascii=False,indent=2)
print("✅ اتضاف")
