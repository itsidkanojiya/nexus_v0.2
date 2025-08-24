import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { tw } from "../../constants/tw.confing";

const SPACER_WIDTH = 4;
const FONT_SIZE = 12;

const ANSWER_BOX_WIDTH = 30;
const ANSWER_BOX_GAP = 8;
const RIGHT_SAFE_MARGIN = 6;

const styles = StyleSheet.create({
  line: { flexDirection: "row", alignItems: "flex-start", marginBottom: 6 },
  numberCol: { paddingTop: 1 }, // width set per-row dynamically
  spacer: { width: SPACER_WIDTH },
  textCol: { flexGrow: 1, flexShrink: 1, minWidth: 0 },
  inlineAnswerBox: {
    border: "1pt solid rgb(7, 82, 117)",
    borderRadius: 4,
    height: 15,
    width: ANSWER_BOX_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    marginLeft: ANSWER_BOX_GAP,
  },
  optionRow: { flexDirection: "row", marginBottom: 4 },
  optionCell: { flexDirection: "row", alignItems: "flex-start" },
});

const QuestionBox = ({ question, index, type, showAnswers, style14 }) => {
  const isMcq = type === "mcq";
  const isTrueFalse = type === "true_false";
  const showsRightBox = !showAnswers && (isMcq || isTrueFalse);

  // reserve space on the right for the inline box (if shown)
  const textRightMargin = showsRightBox
    ? ANSWER_BOX_WIDTH + ANSWER_BOX_GAP + RIGHT_SAFE_MARGIN
    : RIGHT_SAFE_MARGIN;

  // --- NEW: dynamic number column width (avoid "( 11" linebreak) ---
  const n = index + 1;
  const digits = String(n).length;
  // base width for "(9)" ~20, add ~7 per extra digit. Tweak if needed.
  const numberColWidth = 20 + (digits - 1) * 7;

  // MCQ layout
  const optionLengthThreshold = 20;

  // Filter out null/undefined/empty options
  const validOptions =
    question?.options?.filter(
      (opt) => opt && opt.trim() !== "" && opt.trim().toLowerCase() !== "null"
    ) || [];

  const longOptions = validOptions.some(
    (opt) => (opt || "").length > optionLengthThreshold
  );
  const itemsPerRow = longOptions ? 1 : 2;

  const optionRows = [];
  if (validOptions.length > 0) {
    for (let i = 0; i < validOptions.length; i += itemsPerRow) {
      optionRows.push(validOptions.slice(i, i + itemsPerRow));
    }
  }

  // indent options/answers to align with question text (depends on numberColWidth)
  const leftIndent = numberColWidth + SPACER_WIDTH + 20;

  return (
    <View style={tw("mb-4")}>
      {/* Indent only the number+text row; right box stays on page edge */}
      <View style={[styles.line, { marginLeft: 20 }]}>
        <View style={[styles.numberCol, { width: numberColWidth }]}>
          {/* Removed spaces to reduce width: "(11)" not "( 11 )" */}
          <Text style={tw(`text-[${FONT_SIZE}px] font-bold`)}>{`(${n})`}</Text>
        </View>

        <View style={styles.spacer} />

        <View style={[styles.textCol, { marginRight: textRightMargin }]}>
          <Text style={[style14, tw(`text-[${FONT_SIZE}px]`)]}>
            {question?.question}
          </Text>
        </View>

        {showsRightBox && <View style={styles.inlineAnswerBox} />}
      </View>

      {/* MCQ Options */}
      {isMcq && (
        <View style={{ marginLeft: leftIndent }}>
          {optionRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.optionRow}>
              {row.map((option, i) => {
                // Calculate the actual option index in the valid options array
                const actualIndex = rowIndex * itemsPerRow + i;
                const letter = String.fromCharCode(97 + actualIndex);
                const twoColStyle =
                  itemsPerRow === 2 ? { width: 140, marginRight: 12 } : null;
                return (
                  <View key={i} style={[styles.optionCell, twoColStyle]}>
                    <Text
                      style={tw(`text-[${FONT_SIZE}px] font-bold`)}
                    >{`(${letter})`}</Text>
                    <Text style={[style14, tw(`text-[${FONT_SIZE}px] ml-1`)]}>
                      {option}
                    </Text>
                  </View>
                );
              })}
              {itemsPerRow === 2 && row.length === 1 && (
                <View style={{ width: 140 }} />
              )}
            </View>
          ))}
        </View>
      )}

      {showAnswers && (
        <View style={{ marginLeft: leftIndent, marginTop: 4 }}>
          <Text style={[style14, tw(`text-[${FONT_SIZE}px] text-green-600`)]}>
            Ans: {question?.answer}
          </Text>
        </View>
      )}
    </View>
  );
};

export default QuestionBox;
