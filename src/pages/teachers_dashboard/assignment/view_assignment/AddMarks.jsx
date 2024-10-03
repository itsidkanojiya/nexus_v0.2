import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputBox from "../../../../components/inputs/InputBox";
import AppButton from "../../../../components/buttons/AppButton";
import {
    getSelectedQuestionsWithDetails,
    setMarks,
} from "../../../../store/features/questionsSlice";
import { usePaperStore } from "../../../../zustand/store";

const AddMarks = ({ goNext, goPrev }) => {
    const dispatch = useDispatch();
    const paper = usePaperStore((state) => state.paper);
    const paperQuestions = useSelector((state) =>
        getSelectedQuestionsWithDetails(state?.questions)
    );
    const { marks } = useSelector((state) => state.questions);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({});

    const onSubmit = (data) => {
        console.log(data);
        goNext();
        dispatch(setMarks(data));
    };

    useEffect(() => {
        if (marks) {
            const keys = Object.keys(marks);
            keys.forEach((key) => {
                setValue(key, marks[key] > 0 ? marks[key] : "");
            });
        }
    }, [marks]);

    return (
        <div>
            <div className=" max-w-screen-sm mx-auto  flex items-center flex-col justify-center p-2 md:p-14  rounded-xl shadow-md">
                <div>
                    <img src={paper?.logo} className=" h-24 md:h-32 mb-4" />
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" space-y-3 w-full"
                >
                    <div className="  grid grid-cols-2 gap-3">
                        <InputBox
                            register={register}
                            isRequired={
                                paperQuestions?.mcq?.questions?.length > 0
                            }
                            errors={errors}
                            name="mcq"
                            placeholder="Marks"
                            label={`MCQ  ( ${
                                paperQuestions?.mcq?.questions?.length || 0
                            } )`}
                        />
                        <InputBox
                            register={register}
                            isRequired={
                                paperQuestions?.blanks?.questions?.length > 0
                            }
                            errors={errors}
                            name="blanks"
                            placeholder="Marks"
                            label={`Blanks ( ${
                                paperQuestions?.blanks?.questions?.length || 0
                            } ) `}
                        />
                        <InputBox
                            register={register}
                            isRequired={
                                paperQuestions?.true_false?.questions?.length >
                                0
                            }
                            errors={errors}
                            name="true_false"
                            placeholder="Marks"
                            label={`True & False ( ${
                                paperQuestions?.true_false?.questions?.length ||
                                0
                            } ) `}
                        />
                        <InputBox
                            register={register}
                            isRequired={
                                paperQuestions?.onetwo?.questions?.length > 0
                            }
                            errors={errors}
                            name="onetwo"
                            placeholder="Marks"
                            label={`One Liner  ( ${
                                paperQuestions?.onetwo?.questions?.length || 0
                            } ) `}
                        />
                        <InputBox
                            register={register}
                            isRequired={
                                paperQuestions?.short?.questions?.length > 0
                            }
                            errors={errors}
                            name="short"
                            placeholder="Marks"
                            label={`Short Answer Questions. ( ${
                                paperQuestions?.short?.questions?.length || 0
                            } ) `}
                        />
                        <InputBox
                            register={register}
                            isRequired={
                                paperQuestions?.long?.questions?.length > 0
                            }
                            errors={errors}
                            name="long"
                            placeholder="Marks"
                            label={`Long Answer Questions. ( ${
                                paperQuestions?.long?.questions?.length || 0
                            } ) `}
                        />
                    </div>
                    <AppButton type="submit" className="w-full">
                        Preview
                    </AppButton>
                    <AppButton
                        type="button"
                        onClick={() => goPrev()}
                        className=" w-full bg-red-600"
                    >
                        Go Back
                    </AppButton>
                </form>
            </div>
        </div>
    );
};

export default AddMarks;
