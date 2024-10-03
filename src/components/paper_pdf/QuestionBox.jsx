import { Image, Text, View } from "@react-pdf/renderer";
import React from "react";
import { tw } from "../../constants/tw.confing";

const QuestionBox = ({ question, index, type, showAnswers }) => {
    return (
        <View style={tw("ml-8 mb-4 mr-8")}>
            <View style={tw(" flex  flex-row items-center  justify-between ")}>
                <View style={tw(" flex flex-row items-center gap-2  ")}>
                    <Text style={tw(" text-[12px]    ")}>( {index + 1} )</Text>
                    <Text style={tw(" text-[12px]    ")}>
                        {question?.question}
                    </Text>
                </View>
                {!showAnswers && type === "true_false" && (
                    <Image
                        style={tw("h-6 w-6 object-contain")}
                        src="/img/checkbox.png"
                    />
                )}
            </View>
            {question?.options?.length > 0 ? (
                <View style={tw(" flex flex-row items-center gap-2  ")}>
                    {question?.options?.map((option) => (
                        <View
                            style={tw(
                                "text-[12px]    flex flex-row items-center gap-0.5"
                            )}
                            key={option}
                        >
                            <Image
                                style={tw("h-6 w-6 object-contain")}
                                src="/img/checkbox.png"
                            />
                            <Text style={tw("text-[12px]   ")}>{option}</Text>
                        </View>
                    ))}
                </View>
            ) : null}
            {showAnswers && (
                <View style={tw(" flex flex-row items-center gap-2  ")}>
                    <Text style={tw(" text-[12px]    ")}>
                        {" "}
                        Ans: {question.answer}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default QuestionBox;
