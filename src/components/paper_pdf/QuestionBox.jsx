import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { tw } from "../../constants/tw.confing";

const styles = StyleSheet.create({
  inlineAnswerBox: {
    border: "1pt solid rgb(7, 82, 117)",
    borderRadius: 4,
    height: 15,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    gap: 4,
  },
  questionTextWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexGrow: 1,
    flexShrink: 1,
  },
});

const QuestionBox = ({ question, index, type, showAnswers, style14 }) => {
  const isMcq = type === "mcq";

  const optionLengthThreshold = 20;
  const longOptions = question?.options?.some(
    (opt) => opt.length > optionLengthThreshold
  );
  const itemsPerRow = longOptions ? 1 : 2;

  const optionRows = [];
  if (question?.options?.length > 0) {
    for (let i = 0; i < question.options.length; i += itemsPerRow) {
      optionRows.push(question.options.slice(i, i + itemsPerRow));
    }
  }

  return (
    <View style={tw("mb-4")}>
      {/* Question Line with Answer Box on Right */}
      <View style={styles.questionRow}>
        <View style={styles.questionTextWrap}>
          <Text style={tw("text-[12px] font-bold")}>( {index + 1} )</Text>
          <Text style={[style14, tw("text-[12px] ml-1")]}>
            {question?.question}
          </Text>
        </View>
        {!showAnswers && isMcq && <View style={styles.inlineAnswerBox}></View>}
      </View>

      {/* MCQ Options */}
      {isMcq && (
        <View style={tw("ml-6 gap-1")}>
          {optionRows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                tw("flex flex-row mb-1"),
                itemsPerRow === 2 && { minHeight: 20 },
              ]}
            >
              {row.map((option, i) => {
                const letter = String.fromCharCode(
                  97 + i + rowIndex * itemsPerRow
                ); // a, b, c, d

                // For two options per row, set a fixed width for each option column to align vertically
                const optionColumnWidth = itemsPerRow === 2 ? 140 : undefined;

                return (
                  <View
                    key={i}
                    style={[
                      tw("flex flex-row items-start"),
                      optionColumnWidth ? { width: optionColumnWidth } : {},
                    ]}
                  >
                    <Text style={tw("text-[12px] font-bold")}>({letter})</Text>
                    <Text style={tw("text-[12px] ml-1")}>{option}</Text>
                  </View>
                );
              })}
              {/* If this row has only one option but itemsPerRow is 2, add an empty placeholder to keep columns aligned */}
              {itemsPerRow === 2 && row.length === 1 && (
                <View style={{ width: 140 }} />
              )}
            </View>
          ))}
        </View>
      )}

      {/* Show Answer if enabled */}
      {showAnswers && (
        <View style={tw("ml-6 mt-1")}>
          <Text style={tw("text-[12px] text-green-600")}>
            Ans: {question.answer}
          </Text>
        </View>
      )}
    </View>
  );
};

export default QuestionBox;
