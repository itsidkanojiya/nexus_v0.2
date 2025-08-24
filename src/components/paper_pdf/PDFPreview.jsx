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

// Import font files directly
import lohitGujaratiFont from "/fonts/lohit_gujarati/Lohit-Gujarati.ttf";
import devanagariFont from "/fonts/hindi/NotoSansDevanagari-Regular.ttf";

// Alternative approach: If direct imports don't work, you can convert fonts to base64
// and use them like this:
// Font.register({
//   family: "LohitGujarati",
//   src: "data:font/ttf;base64,YOUR_BASE64_STRING_HERE"
// });

// Utility function to register fonts with error handling
const registerFonts = () => {
  try {
    Font.register({
      family: "LohitGujarati",
      src: lohitGujaratiFont,
    });
    Font.register({
      family: "Devnagari",
      src: devanagariFont,
    });
  } catch (error) {
    console.warn("Font registration failed, using fallback fonts:", error);
    // Fallback to system fonts if custom fonts fail
    Font.register({
      family: "LohitGujarati",
      src: "Helvetica",
    });
    Font.register({
      family: "Devnagari",
      src: "Helvetica",
    });
  }
};

// Register fonts
registerFonts();

const styles = StyleSheet.create({
  eng14: { fontSize: 14 },
  guj14: { fontFamily: "LohitGujarati", fontSize: 14 },
  hin14: { fontFamily: "Devnagari", fontSize: 14 },
  footer: {
    fontSize: 10,
    borderTop: "1pt solid black",
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
    headerDetails?.subject?.toLowerCase() === "hindi" ||
    headerDetails?.subject?.toLowerCase() === "sanskrit"
      ? "hin14" // or make a new "sans14"
      : headerDetails?.subject?.toLowerCase() === "gujarati"
      ? "guj14"
      : "eng14";

  return (
    <Document>
      {/* add a little extra left padding so content never hugs the edge */}
      <Page
        size="A4"
        style={[
          tw("p-8"),
          { paddingLeft: 30, paddingRight: 30, paddingBottom: 60 },
        ]} // 👈 extra bottom padding
        wrap
      >
        {/* Header */}
        {headerDetails && (
          <PeparHeader
            headerDetails={headerDetails}
            questionsList={questionsList}
          />
        )}

        {/* Body */}
        <View style={tw("mt-10")}>
          {(() => {
            const activeQuestionTypes = questionTypes.filter(
              (type) => questionsList[type]
            );
            return activeQuestionTypes.map((type, activeIndex) => {
              const sectionLetter = String.fromCharCode(65 + activeIndex); // A, B, C...

              return (
                // IMPORTANT: allow wrapping (NO wrap={false})
                <View style={tw("mb-8")} key={type}>
                  {/* Section Title Row */}
                  <View
                    style={tw(
                      "flex flex-row items-center justify-between mb-2"
                    )}
                  >
                    <View style={tw("flex flex-row items-center")}>
                      <Text
                        style={tw("text-[13px] font-extrabold text-sky-700")}
                      >
                        {sectionLetter} )
                      </Text>
                      <Text
                        style={[
                          styles[font14],
                          tw("text-[13px] font-extrabold text-sky-700"),
                          { marginLeft: 6, marginRight: 12 }, // small gap before marks
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

                  {/* Questions */}
                  {questionsList[type].questions.map((question, qIndex) => (
                    <QuestionBox
                      key={qIndex}
                      question={question}
                      index={qIndex}
                      showAnswers={showAnswers}
                      type={type}
                      style14={styles[font14]}
                    />
                  ))}
                </View>
              );
            });
          })()}
        </View>

        {/* Footer */}
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
