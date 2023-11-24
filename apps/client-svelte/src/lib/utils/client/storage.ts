// 实现以下操作会自动存储storage和修改
//
// storage.profile
// storage.profile = xxx
// storage.clear()
// storage.remove("token")
// storage.removeAll(["token"])

type AppStorageKey = "token" | "theme"

type StorageActions = {
  clear: () => void
  remove: (key: AppStorageKey) => void
}

const storageOrigin :StorageActions = {
  // @ts-ignore
  clear: () => localStorage.clear(),
  // @ts-ignore
  remove: (key: AppStorageKey) => localStorage.removeItem(key),
}

interface AppStorage extends StorageActions, Partial<Record<AppStorageKey, any>> {}

type AppStorageProp = keyof AppStorage

// 使用is谓词的方法判断参数是否为action
function isAction(prop: AppStorageProp) :prop is keyof StorageActions{
  return prop in storageOrigin
}

const proxyHandler :ProxyHandler<AppStorage> = {
  get(target :AppStorage, prop: AppStorageProp){
    if(isAction(prop)){ return target[prop] }
    let data = null
    try {
      // @ts-ignore
      data = localStorage.getItem(prop)
    } catch (error) {}
    return data;
  },

  set(target :AppStorage, prop: AppStorageProp, value: any){
    if(isAction(prop)){ throw "不能修改storage函数，如果需要定义，请在originStorage对象上添加"; }
    let success = false
    try {
      if(!value){
        target.remove(prop)
      }else{
        // @ts-ignore
        localStorage.setItem(prop, value)
      }
      success = true
    } catch (error) {}
    return success
  }
}

export const appStorage = new Proxy<AppStorage>(storageOrigin, proxyHandler)
