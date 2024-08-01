import { Image, Text, View } from "@react-pdf/renderer";
import React from "react";
import { tw } from "../../constants/tw.confing";

const QuestionBox = ({ question, index, showAnswers }) => {
    return (
        <View style={tw("ml-8 mb-4 mr-8")}>
            <View style={tw(" flex flex-row items-center gap-2  ")}>
                <Text style={tw(" text-sm ")}>{index + 1} )</Text>
                <Text style={tw(" text-sm ")}>{question?.question}</Text>
            </View>
            {question?.options?.length > 0 ? (
                <View style={tw(" flex flex-row items-center gap-2  ")}>
                    {question?.options?.map((option) => (
                        <View
                            style={tw(" flex flex-row items-center gap-0.5")}
                            key={option}
                        >
                            <Image
                                style={tw("h-6 w-6 object-contain")}
                                src="/img/checkbox.png"
                            />
                            <Text style={tw("text-sm")}>{option}</Text>
                        </View>
                    ))}
                </View>
            ) : null}
            {showAnswers && (
                <View style={tw(" flex flex-row items-center gap-2  ")}>
                    <Text style={tw(" text-sm ")}> Ans: {question.answer}</Text>
                </View>
            )}
        </View>
    );
};

export default QuestionBox;
