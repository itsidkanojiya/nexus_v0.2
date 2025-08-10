import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { tw } from "../../constants/tw.confing";

const styles = StyleSheet.create({
  checkbox: {
    border: "1pt solid #000",
    height: 14,
    width: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  answerLine: {
    color: "#0369A1", // <- change this to any color you want, like 'blue' or '#FF0000'
    fontSize: 12,
  },
});

const QuestionBox = ({
  question,
  index,
  isPaper,
  type,
  showAnswers,
  style14,
}) => {
  const isMcq = type === "mcq";
  const isTrueFalse = type === "true_false";
  const isCheckbox = isMcq || isTrueFalse;

  // Estimate total option text length
  const totalTextLength = question?.options?.reduce(
    (acc, opt) => acc + opt.length,
    0
  );

  const oneRowLayout = totalTextLength <= 50;

  // Break into 2-by-2 if too long
  const optionRows = [];
  if (!oneRowLayout && question?.options?.length > 0) {
    for (let i = 0; i < question.options.length; i += 2) {
      optionRows.push(question.options.slice(i, i + 2));
    }
  }

  return (
    <View style={tw("ml-6 mb-6 mr-6")}>
      {/* Question Header with Index and Checkbox (for mcq/true_false) */}
      <View
        style={[
          tw("flex flex-row justify-between items-start mb-2"),
          { flexWrap: "wrap" },
        ]}
      >
        <View style={tw("flex flex-row items-start gap-2 flex-1")}>
          <Text style={tw("text-[12px] font-bold")}>( {index + 1} )</Text>
          <Text style={[style14, tw("text-[12px]")]}>{question?.question}</Text>
        </View>
        {!showAnswers && isCheckbox && (
          <View style={styles.checkbox}>
            <Text style={tw("text-[10px] text-gray-500")}></Text>
          </View>
        )}
      </View>

      {/* Options Layout */}
      {isMcq && question?.options?.length > 0 && (
        <View style={tw("ml-8 gap-1")}>
          {oneRowLayout ? (
            <View style={tw("flex flex-row flex-wrap gap-x-8 gap-y-1")}>
              {question.options.map((option, idx) => (
                <View
                  key={option}
                  style={tw("flex flex-row items-center gap-1")}
                >
                  <Text style={tw("text-[12px] font-bold")}>
                    ({String.fromCharCode(97 + idx)})
                  </Text>
                  <Text style={[style14, tw("text-[12px]")]}>{option}</Text>
                </View>
              ))}
            </View>
          ) : (
            optionRows.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={tw("flex flex-row gap-x-10 mb-1 items-center")}
              >
                {row.map((option, i) => {
                  const globalIndex = rowIndex * 2 + i;
                  return (
                    <View
                      key={option}
                      style={tw("flex flex-row items-center gap-1")}
                    >
                      <Text style={tw("text-[12px] font-bold")}>
                        ({String.fromCharCode(97 + globalIndex)})
                      </Text>
                      <Text style={[style14, tw("text-[12px]")]}>{option}</Text>
                    </View>
                  );
                })}
              </View>
            ))
          )}
        </View>
      )}

      {/* Answer Preview */}
      {showAnswers && (
        <View style={tw("ml-8 mt-2")}>
          <Text style={[style14, tw("text-[12px] font-semibold")]}>
            Ans: {question.answer}
          </Text>
        </View>
      )}

      {/* Colored Answer Lines */}
      {!showAnswers && type === "onetwo" && (
        <View style={tw("mt-2 gap-1")}>
          {[...Array(2)].map((_, i) => (
            <Text key={i} style={styles.answerLine}>
              ______________________________________________________________________________
            </Text>
          ))}
        </View>
      )}

      {!showAnswers && type === "short" && (
        <View style={tw("mt-2 gap-1")}>
          {[...Array(4)].map((_, i) => (
            <Text key={i} style={styles.answerLine}>
              ______________________________________________________________________________
            </Text>
          ))}
        </View>
      )}

      {!showAnswers && type === "long" && (
        <View style={tw("mt-2 gap-1")}>
          {[...Array(16)].map((_, i) => (
            <Text key={i} style={styles.answerLine}>
              ______________________________________________________________________________
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default QuestionBox;
