import { Image, Text, View } from "@react-pdf/renderer";
import React from "react";
import { tw } from "../../constants/tw.confing";
import dayjs from "dayjs";

const PeparHeader = ({ headerDetails, questionsList }) => {
    const Header = {
        id: 95,
        uid: 94,
        type: "paper",
        school_name: "Knowledge High School",
        std: 1,
        timing: "22:59",
        date: "2024-06-06",
        division: "1st",
        day: "Thursday",
        address: "Anand gujrat",
        board: "Gujarat Board",
        subject: "English",
        logo: "https://backend.nexuspublication.com/storage/logos/M5CEaXXPHYTdwvOAZXwOR7kkrbvmCkJV5AUqfgpn.png",
        questions: null,
    };

    return (
        <View>
            <View
                style={tw(
                    "w-full flex flex-row justify-between items-center gap-4 mb-2 border-b border-slate-800"
                )}
            >
                <View>
                    {headerDetails?.logo ? (
                        <Image
                            style={tw("h-24 object-contain")}
                            src={headerDetails.logo}
                        />
                    ) : (
                        <Text>No Logo</Text>
                    )}
                </View>
                <View style={tw("w-full text-center")}>
                    <Text
                        style={tw(
                            "text-[25px] leading-5 font-serif font-bold mb-1"
                        )}
                    >
                        {headerDetails?.school_name || "Default School Name"}
                    </Text>
                    <Text style={tw("text-[16px] text-slate-600")}>
                        {headerDetails?.address || "Default School Address"}
                    </Text>
                </View>
            </View>
            <View
                style={tw("flex flex-row justify-between items-center w-full")}
            >
                <View>
                    <Text style={tw("text-sm font-serif font-bold")}>
                        STD : {headerDetails?.std || "N/A"}
                    </Text>
                    <Text style={tw("text-sm font-serif font-bold")}>
                        DAY : {headerDetails?.day || "N/A"}
                    </Text>
                </View>
                <View>
                    <Text style={tw("text-sm font-serif font-bold")}>
                        SUBJECT : {headerDetails?.subject || "N/A"}
                    </Text>
                    <Text style={tw("text-sm font-serif font-bold")}>
                        DATE :{" "}
                        {dayjs(headerDetails?.date).format("DD-MM-YYYY") ||
                            "N/A"}
                    </Text>
                </View>
                <View>
                    <Text style={tw("text-sm font-serif font-bold")}>
                        TOTAL MARKS :{" "}
                        {Object.values(questionsList).reduce((total, group) => {
                            return parseInt(total) + parseInt(group.marks);
                        }, 0)}
                    </Text>
                    <Text style={tw("text-sm font-serif font-bold")}>
                        TIME : {headerDetails?.timing || "N/A"}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PeparHeader;
