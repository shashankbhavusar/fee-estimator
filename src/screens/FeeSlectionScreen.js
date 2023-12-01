import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import SelectInput from '../components/SelectInput'
import Header from '../components/Header'
import data from "../data/data.json"
import { checkNonZero, getAllCourse, getAllCourseLevels, getAndSetDataList, getKeys } from '../utils/helper'

const FeeSlectionScreen = () => {

    const [feeType, setFeeType] = useState("0");

    const [nationality, setNationality] = useState("0");
    const [nationalityList, setNationalityList] = useState(null);

    const [courseType, setCourseType] = useState("0");
    const [courseTypeList, setCourseTypeList] = useState(null);

    const [course, setCourse] = useState("0");

    const [courseAllLevel, setCourseAllLevel] = useState("0");
    const [courseAllLevelList, setCourseAllLevelList] = useState(null);

    const [courseLevel, setCourseLevel] = useState("0");

    const [amount, setAmount] = useState(0);

    const sampleData = data
    const feeTypeList = getKeys(sampleData)

    // to set nationality based on feeType
    useEffect(() => {
        getAndSetDataList(data[feeType], setNationalityList)
    }, [feeType])

    // to set course type based on feeType, nationality
    useEffect(() => {
        if (checkNonZero(feeType) && checkNonZero(nationality)) {
            getAndSetDataList(data[feeType][nationality], setCourseTypeList)
        }
    }, [feeType, nationality])

    // to set course level based on feeType, nationality, courseType
    useEffect(() => {
        if (checkNonZero(feeType) && checkNonZero(nationality) && checkNonZero(courseType)) {
            getAndSetDataList(data[feeType][nationality][courseType], setCourseAllLevelList)
        }
    }, [feeType, nationality, courseType])

    // to set amount 
    useEffect(() => {

        const getAmount = () => {
            const amount = data[feeType][nationality][courseType][courseAllLevel] ? data[feeType][nationality][courseType][courseAllLevel]?.amount : 0
            setAmount(amount)
        }

        if (checkNonZero(feeType) && checkNonZero(nationality) && (checkNonZero(courseType)) && (checkNonZero(courseAllLevel)) && (feeType === "Application Fee" || checkNonZero(courseLevel))) {
            getAmount()
        } else {
            setAmount(0)
        }
    }, [feeType, nationality, courseType, courseAllLevel, courseLevel])

    return (
        <>
            <Header />
            <div className='selection-cnt'>
                <div className='form-cnt'>
                    <Form>
                        <SelectInput
                            label={"Fee Type"}
                            optionsArray={feeTypeList}
                            state={feeType}
                            setState={setFeeType}
                        />

                        {
                            checkNonZero(feeType) &&
                            <SelectInput
                                label={"Nationality"}
                                optionsArray={nationalityList}
                                state={nationality}
                                setState={setNationality}
                            />
                        }

                        {
                            checkNonZero(feeType) && checkNonZero(nationality) &&
                            <SelectInput
                                label={"Course Type"}
                                optionsArray={courseTypeList}
                                state={courseType}
                                setState={setCourseType}
                            />
                        }

                        {
                            checkNonZero(feeType) && checkNonZero(nationality) && checkNonZero(courseType) &&
                            <SelectInput
                                label={"Course"}
                                optionsArray={getAllCourse(courseType)}
                                state={course}
                                setState={setCourse}
                            />
                        }

                        {
                            checkNonZero(feeType) && checkNonZero(nationality) && checkNonZero(courseType) && checkNonZero(course) &&
                            <SelectInput
                                label={"Course Level"}
                                optionsArray={courseAllLevelList}
                                state={courseAllLevel}
                                setState={setCourseAllLevel}
                            />
                        }

                        {
                            feeType !== "Application Fee" && checkNonZero(feeType) && checkNonZero(nationality) && checkNonZero(courseType) && checkNonZero(course) && checkNonZero(courseAllLevel) &&
                            <SelectInput
                                label={"Specific Level"}
                                optionsArray={getAllCourseLevels(courseAllLevel)}
                                state={courseLevel}
                                setState={setCourseLevel}
                            />
                        }

                        {
                            amount !== 0 &&
                            <h1 className='amount-txt'>Fees to be paid: {amount}</h1>
                        }
                    </Form>
                </div>
            </div>
        </>
    )
}

export default FeeSlectionScreen