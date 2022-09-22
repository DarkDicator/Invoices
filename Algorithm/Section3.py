def combination(t, l, min):      
    res = []
    if l == 1 and t <= 9:
        res.append([t])
    elif l == 0:
        return res
    else:
        for i in range(min, 9, 1):
            if i <= int(t / l):
                array = combination(t - i, l - 1, min + 1)
                for n in range(0, len(array), 1):
                    currentArr = array[n]
                    if i not in currentArr:
                        currentArr.insert(0, i)
                        res.append(currentArr)            
    return res




if __name__ == "__main__":
    length = input("Input length of combination : ")
    total = input("Input total of combination: ")
    print(combination(int(total), int(length), 1))
