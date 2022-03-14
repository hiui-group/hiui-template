interface ResponseType {
    code: number;
    data: any;
    message: string;
}

/**
 * 提交
 * @param formData 
 * @returns 
 */
export const submitBasicForm = (formData:Record<string,any>):Promise<ResponseType> => {
    console.log(formData);
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                code: 200,
                data: 'success',
                message: '保存成功'
            })
        },1000)
        
    })
}

/**
 * 暂存
 * @param formData 
 * @returns 
 */
export const stashBasicForm = (formData:Record<string,any>):Promise<ResponseType> => {
    console.log(formData);
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                code: 200,
                data: 'success',
                message: '暂存成功'
            })
        },1000)
    })
}