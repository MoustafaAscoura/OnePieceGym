import { kv } from "@vercel/kv";

export async function RedisCache (key, sourceFunction, expiry=6) {
    const data = await kv.get(key)
    if (data != null) {
        return data
    } else {
        const new_data = await sourceFunction()
        await kv.set(key, JSON.stringify(new_data), {ex:expiry*3600})
        await kv.set(`${key}:count`, new_data.length, {ex:expiry*3600})
        return new_data
    }
}

export async function UpdateCache (key, new_object) {
    await kv.del(key)
    // const data = await kv.get(key)
    // data.forEach(async (element, index) => {
    //     if (element.id == new_object.id) {
    //         return await kv.lset(key, index, JSON.stringify(new_object))
    //     }
    // })
}

export async function AppendCache (key, new_object, right=false) {
    await kv.del(key)
    // const data = await kv.get(key)
    // console.log(`Adding ${JSON.stringify(new_object)} to ${key}: ${data}`)
    // if (!(data == null)) {
    //     let old_count = await kv.get(`${key}:count`)
    //     await kv.set(`${key}:count`, old_count? parseInt(old_count) + 1 : 1, {ex:6*3600})
    //     return right ? await kv.rpush(key, JSON.stringify(new_object)) : await kv.lpush(key, JSON.stringify(new_object))
    // }
}

export async function RemoveCache (key, delete_object){
    await kv.del(key)
    // let old_count = await kv.get(`${key}:count`)
    // await kv.set(`${key}:count`, old_count? parseInt(old_count) -1 : 0, {ex:6*3600})
    // return await kv.lrem(key, 0, delete_object)
}

