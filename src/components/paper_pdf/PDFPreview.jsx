import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import QuestionBox from "./QuestionBox";
import PeparHeader from "./PeparHeader";
import { tw } from "../../constants/tw.confing";

const characters = ["a", "b", "c", "d", "e", "f"];

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
    let characterIndex = 0;

    return (
        <Document>
            <Page size="A4" style={tw("p-8")}>
                <View>
                    {headerDetails && (
                        <PeparHeader
                            headerDetails={headerDetails}
                            questionsList={questionsList}
                        />
                    )}
                    <View style={tw("mt-10")}>
                        {questionTypes?.map((_, index) => {
                            const type = questionTypes[index];
                            if (!questionsList[type]) return;
                            const character =
                                characters[characterIndex % characters.length];
                            characterIndex++;
                            return (
                                <View style={tw("mb-8")} key={index}>
                                    <View
                                        style={tw(
                                            " flex  flex-row items-center  justify-between "
                                        )}
                                    >
                                        <View
                                            style={tw(
                                                " flex  flex-row items-center gap-2 mb-2.5"
                                            )}
                                        >
                                            <Text
                                                style={tw(
                                                    "text-sm text-lg font-serif font-bold uppercase "
                                                )}
                                            >
                                                {character} )
                                            </Text>
                                            <Text
                                                style={tw(
                                                    "text-sm text-lg font-serif font-bold "
                                                )}
                                            >
                                                {questionsList[type].title}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={tw(
                                                    " text-base font-bold "
                                                )}
                                            >
                                                ( {questionsList[type].marks} )
                                            </Text>
                                        </View>
                                    </View>
                                    {questionsList[type].questions.map(
                                        (question, index) => (
                                            <QuestionBox
                                                key={index}
                                                question={question}
                                                index={index}
                                                showAnswers={showAnswers}
                                            />
                                        )
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    );
}
