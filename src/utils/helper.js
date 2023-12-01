export const checkNonZero = (state) => {
    return state !== "0"
}

export const getKeys = (data)=>{
    return data ? Object.keys(data) : []
}

export const getAllCourse = (state) => {
    if(state === "ALL_COURSES"){
        return ["Medical", "Dental", "Ayurveda" ]
    }else {
        return [] // no condition specified yet
    }
}

export const getAllCourseLevels = (state) => {
    if(state === "ALL_LEVEL"){
        return ["UG", "PG", "DIPLOMA", "Ph.D" ]
    }else {
        return [] // no condition specified yet
    }
}

export const getAndSetDataList = (data, setterFunc)=>{
    const list = data ? getKeys(data) : []
    setterFunc(list)
}