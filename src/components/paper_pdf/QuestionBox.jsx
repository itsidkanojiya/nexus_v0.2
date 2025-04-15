import { Image, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { tw } from "../../constants/tw.confing";

const styles = StyleSheet.create({
    inlineAnswerBox: {
      border: "1pt solid #000",
      height: 14,
      width: 40, // adjust width for short answers like A/B/C/D
      marginLeft: 8,
      paddingHorizontal: 4,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  

const QuestionBox = ({ question, index, type, showAnswers, style14 }) => {
  const isMcqOrTF = type === "mcq" || type === "true_false";

  // Determine layout based on option length
  const optionLengthThreshold = 15;
  const use2PerRow =
    question?.options?.some((opt) => opt.length > optionLengthThreshold) ?? false;
  const itemsPerRow = use2PerRow ? 2 : 4;

  // Split options accordingly
  const optionRows = [];
  if (question?.options?.length > 0) {
    for (let i = 0; i < question.options.length; i += itemsPerRow) {
      optionRows.push(question.options.slice(i, i + itemsPerRow));
    }
  }

  return (
    <View style={tw("ml-4 mb-6 mr-4")}>
      {/* Question with inline answer box */}
      <View style={tw("flex flex-row items-center flex-wrap gap-1 mb-2")}>
        <Text style={tw("text-[12px] font-bold")}>( {index + 1} )</Text>
        <Text style={[style14, tw("text-[12px]")]}>{question?.question}</Text>
        {!showAnswers && isMcqOrTF && (
          <View style={styles.inlineAnswerBox}>
            <Text style={tw("text-[10px] text-gray-500")}></Text>
          </View>
        )}
      </View>

      {/* Options - smart layout: 2 or 4 per row */}
      {optionRows.length > 0 && (
        <View style={tw("ml-8 gap-2")}>
          {optionRows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={tw("flex flex-row gap-8 mb-1 items-center flex-wrap")}
            >
              {row.map((option, i) => (
                <View
                  key={option}
                  style={tw("flex flex-row items-center gap-1")}
                >
                  <Image
                    style={tw("h-4 w-4 object-contain")}
                    src="/img/checkbox.png"
                  />
                  <Text style={tw("text-[12px]")}>{option}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Answer shown if preview enabled */}
      {showAnswers && (
        <View style={tw("ml-8 mt-2")}>
          <Text style={tw("text-[12px]")}>Ans: {question.answer}</Text>
        </View>
      )}
    </View>
  );
};

export default QuestionBox;
