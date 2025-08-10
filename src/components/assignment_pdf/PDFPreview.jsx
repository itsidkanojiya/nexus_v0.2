import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import React from "react";
import PeparHeader from "./PeparHeader";
import QuestionBox from "./QuestionBox";
import { tw } from "../../constants/tw.confing";

// Register fonts
Font.register({
  family: "LohitGujarati",
  src: "../../../public/fonts/lohit_gujarati/Lohit-Gujarati.ttf",
});
Font.register({
  family: "Devnagari",
  src: "../../../public/fonts/hindi/NotoSansDevanagari-Regular.ttf",
});

// Styles
const styles = StyleSheet.create({
  eng14: { fontSize: 14 },
  guj14: { fontFamily: "LohitGujarati", fontSize: 14 },
  hin14: { fontFamily: "Devnagari", fontSize: 14 },
  footer: {
    fontSize: 10,
    borderTop: "1pt solid #000",
    paddingTop: 5,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
  },
});

export default function PDFPreview({
  showAnswers,
  headerDetails,
  questionsList,
}) {
  const questionTypes = [
    "mcq",
    "blanks",
    "true_false",
    "onetwo",
    "short",
    "long",
  ];

  const font14 =
    headerDetails?.subject?.toLowerCase() === "hindi"
      ? "hin14"
      : headerDetails?.subject?.toLowerCase() === "gujarati"
      ? "guj14"
      : "eng14";

  return (
    <Document>
      <Page size="A4" style={tw("p-8")} wrap>
        {/* Header */}
        {headerDetails && (
          <PeparHeader
            headerDetails={headerDetails}
            questionsList={questionsList}
          />
        )}

        {/* All Question Sections */}
        <View style={tw("mt-10")}>
          {questionTypes.map((type, index) => {
            if (!questionsList[type]) return null;
            const sectionLetter = String.fromCharCode(65 + index); // A, B, C...

            const questions = questionsList[type].questions;

            return (
              <View style={tw("mb-8")} key={index}>
                {/* Wrap Section Title + First Question together */}
                <View wrap={false}>
                  {/* Section Title */}
                  <View
                    style={tw(
                      "flex flex-row items-center justify-between mb-2"
                    )}
                  >
                    <View style={tw("flex flex-row items-center gap-2")}>
                      <Text
                        style={tw("text-[13px] font-extrabold text-sky-700")}
                      >
                        {sectionLetter} )
                      </Text>
                      <Text
                        style={[
                          styles[font14],
                          tw("text-[13px] font-extrabold text-sky-700"),
                        ]}
                      >
                        {questionsList[type].title}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles[font14],
                        tw("text-[13px] font-extrabold text-sky-700"),
                      ]}
                    >
                      ( {questionsList[type].marks} )
                    </Text>
                  </View>

                  {/* First Question */}
                  {questions.length > 0 && (
                    <QuestionBox
                      key={0}
                      question={questions[0]}
                      index={0}
                      showAnswers={showAnswers}
                      type={type}
                      style14={styles[font14]}
                    />
                  )}
                </View>

                {/* Remaining Questions */}
                {questions.slice(1).map((question, qIndex) => (
                  <QuestionBox
                    key={qIndex + 1}
                    question={question}
                    index={qIndex + 1}
                    showAnswers={showAnswers}
                    type={type}
                    style14={styles[font14]}
                  />
                ))}
              </View>
            );
          })}
        </View>

        {/* Footer: Page number and subject on EVERY page */}
        <View style={styles.footer} fixed>
          <Text>
            {headerDetails?.subject || "Paper"} | Std -{" "}
            {headerDetails?.std || "-"}
          </Text>
          <Text render={({ pageNumber }) => `Page | ${pageNumber}`} />
        </View>
      </Page>
    </Document>
  );
}
