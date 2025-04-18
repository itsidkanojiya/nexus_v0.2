import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import React from "react";
import QuestionBox from "./QuestionBox";
import PeparHeader from "./PeparHeader";
import { tw } from "../../constants/tw.confing";

const characters = ["a", "b", "c", "d", "e", "f"];

Font.register({
  family: "LohitGujarati",
  src: "../../../public/fonts/lohit_gujarati/Lohit-Gujarati.ttf",
});
Font.register({
  family: "Devnagari",
  src: "../../../public/fonts/hindi/NotoSansDevanagari-Regular.ttf",
});

// Define styles using the registered font
export const styles = StyleSheet.create({
  eng14: { fontSize: 14 },
  guj14: { fontFamily: "LohitGujarati", fontSize: 14 },
  hin14: { fontFamily: "Devnagari", fontSize: 14 },
});

export default function PDFPreview({
  headerDetails,
  questionsList,
  showAnswers,
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
    headerDetails?.subject.toLowerCase() === "hindi"
      ? "hin14"
      : headerDetails?.subject.toLowerCase() === "gujarati"
      ? "guj14"
      : "eng14";

  let characterIndex = 0;
  return (
    <Document>
      <Page size="A4" style={tw("p-8")}>
        <View>
          {headerDetails && <PeparHeader headerDetails={headerDetails} />}
          <View style={tw("mt-10")}>
            {questionTypes?.map((_, index) => {
              const type = questionTypes[index];
              if (!questionsList[type]) return;
              const character = characters[characterIndex % characters.length];
              characterIndex++;
              return (
                <View style={tw("mb-8")} key={index}>
                  <View
                    style={tw(" flex  flex-row items-center  justify-between ")}
                  >
                    <View
                      style={tw(" flex  flex-row items-center gap-2 mb-2.5")}
                    >
                      <Text
                        style={tw(
                          "text-[19px] text-lg font-serif font-bold uppercase "
                        )}
                      >
                        {character} )
                      </Text>
                      <Text style={styles[font14]}>
                        {questionsList[type].title}
                      </Text>
                    </View>
                  </View>
                  {questionsList[type].questions.map((question, index) => (
                    <QuestionBox
                      key={index}
                      question={question}
                      index={index}
                      isPaper={true}
                      type={type}
                      showAnswers={showAnswers}
                      style14={styles[font14]}
                    />
                  ))}
                </View>
              );
            })}
            <View
              style={tw("flex flex-row justify-between items-center w-full")}
            >
              <View>
                <Text style={tw("text-sm font-serif font-bold")}>
                  TEACHER'S SIGN : __________________________
                </Text>
              </View>
              <View>
                <Text style={tw("text-sm font-serif font-bold")}>
                  DATE : __________________________
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
