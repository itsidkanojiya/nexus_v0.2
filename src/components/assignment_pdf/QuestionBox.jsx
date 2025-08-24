import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { tw } from "../../constants/tw.confing";

const FONT_SIZE = 12;
const SPACER_WIDTH = 4; // small gap after the number

// Right-side inline checkbox (for mcq/true_false when NOT showing answers)
const CHECKBOX_WIDTH = 30;
const CHECKBOX_HEIGHT = 14;
const RIGHT_GAP = 8; // space between text and checkbox
const RIGHT_SAFE_MARGIN = 6; // small breathing room even when no checkbox

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerLine: {
    marginBottom: 8,
  },
  numberCol: {
    paddingTop: 1, // aligns number with first line of text
  },
  spacer: {
    width: SPACER_WIDTH,
  },
  textCol: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  checkbox: {
    border: "1pt solid #000",
    height: CHECKBOX_HEIGHT,
    width: CHECKBOX_WIDTH,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    marginLeft: RIGHT_GAP,
  },
  optionRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  optionCell: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  answerLine: {
    color: "#0369A1",
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
  const showsCheckbox = !showAnswers && (isMcq || isTrueFalse);

  // --- Dynamic number width to prevent "(11" line-breaks ---
  const n = index + 1;
  const digits = String(n).length;
  // base ~20 fits "(9)"; add ~7 per extra digit
  const numberColWidth = 20 + (digits - 1) * 7;

  // Reserve space on the RIGHT so question text never runs under the checkbox
  const textRightMargin = showsCheckbox
    ? CHECKBOX_WIDTH + RIGHT_GAP + RIGHT_SAFE_MARGIN
    : RIGHT_SAFE_MARGIN;

  // Option layout: 1-per-row if any long option; otherwise 2-per-row grid

  // Filter out null/undefined/empty options
  const validOptions =
    question?.options?.filter(
      (opt) => opt && opt.trim() !== "" && opt.trim().toLowerCase() !== "null"
    ) || [];

  const totalLen = validOptions.reduce((a, s) => a + (s?.length || 0), 0);
  const onePerRow = totalLen <= 50 ? true : false;

  const optionRows = [];
  if (!onePerRow && validOptions.length > 0) {
    for (let i = 0; i < validOptions.length; i += 2) {
      optionRows.push(validOptions.slice(i, i + 2));
    }
  }

  return (
    <View style={tw("ml-6 mr-6 mb-6")}>
      {/* Header line: (number) + text  |  checkbox */}
      <View style={[styles.row, styles.headerLine]}>
        {/* number column */}
        <View style={[styles.numberCol, { width: numberColWidth }]}>
          <Text style={tw(`text-[${FONT_SIZE}px] font-bold`)}>{`(${n})`}</Text>
        </View>

        {/* small spacer */}
        <View style={styles.spacer} />

        {/* question text (with reserved right margin if checkbox present) */}
        <View style={[styles.textCol, { marginRight: textRightMargin }]}>
          <Text style={[style14, tw(`text-[${FONT_SIZE}px]`)]}>
            {question?.question}
          </Text>
        </View>

        {/* right checkbox (only for mcq/true_false when not showing answers) */}
        {showsCheckbox && <View style={styles.checkbox} />}
      </View>

      {/* MCQ Options */}
      {isMcq && validOptions.length > 0 && (
        <View style={{ marginLeft: numberColWidth + SPACER_WIDTH + 12 }}>
          {onePerRow
            ? // one-per-row (wrap naturally)
              validOptions.map((option, optIdx) => (
                <View key={`${optIdx}-${option}`} style={styles.optionRow}>
                  <View style={styles.optionCell}>
                    <Text style={tw(`text-[${FONT_SIZE}px] font-bold`)}>
                      {`(${String.fromCharCode(97 + optIdx)})`}
                    </Text>
                    <Text style={[style14, tw(`text-[${FONT_SIZE}px] ml-1`)]}>
                      {option}
                    </Text>
                  </View>
                </View>
              ))
            : // two-per-row grid (fixed width keeps columns aligned)
              optionRows.map((row, r) => (
                <View key={`r-${r}`} style={styles.optionRow}>
                  {row.map((option, i) => {
                    // Calculate the actual option index in the valid options array
                    const actualIndex = r * 2 + i;
                    return (
                      <View
                        key={`${actualIndex}-${option}`}
                        style={[
                          styles.optionCell,
                          { width: 140, marginRight: 12 },
                        ]}
                      >
                        <Text style={tw(`text-[${FONT_SIZE}px] font-bold`)}>
                          {`(${String.fromCharCode(97 + actualIndex)})`}
                        </Text>
                        <Text
                          style={[style14, tw(`text-[${FONT_SIZE}px] ml-1`)]}
                        >
                          {option}
                        </Text>
                      </View>
                    );
                  })}
                  {/* keep grid shape if odd count */}
                  {row.length === 1 && <View style={{ width: 140 }} />}
                </View>
              ))}
        </View>
      )}

      {/* Show Answers (any type) */}
      {showAnswers && (
        <View
          style={{
            marginLeft: numberColWidth + SPACER_WIDTH + 12,
            marginTop: 4,
          }}
        >
          <Text style={[style14, tw(`text-[${FONT_SIZE}px] font-semibold`)]}>
            Ans: {question?.answer}
          </Text>
        </View>
      )}

      {/* Answer lines for non-MCQ types when NOT showing answers */}
      {!showAnswers && type === "onetwo" && (
        <View
          style={{
            marginLeft: numberColWidth + SPACER_WIDTH + 12,
            marginTop: 6,
          }}
        >
          {[...Array(2)].map((_, i) => (
            <Text key={`ol-${i}`} style={styles.answerLine}>
              ______________________________________________________________________________
            </Text>
          ))}
        </View>
      )}

      {!showAnswers && type === "short" && (
        <View
          style={{
            marginLeft: numberColWidth + SPACER_WIDTH + 12,
            marginTop: 6,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <Text key={`sl-${i}`} style={styles.answerLine}>
              ______________________________________________________________________________
            </Text>
          ))}
        </View>
      )}

      {!showAnswers && type === "long" && (
        <View
          style={{
            marginLeft: numberColWidth + SPACER_WIDTH + 12,
            marginTop: 6,
          }}
        >
          {[...Array(16)].map((_, i) => (
            <Text key={`ll-${i}`} style={styles.answerLine}>
              ______________________________________________________________________________
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default QuestionBox;
