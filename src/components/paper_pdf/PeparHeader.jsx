import { Image, Text, View } from "@react-pdf/renderer";
import React from "react";
import { tw } from "../../constants/tw.confing";
import dayjs from "dayjs";

const PeparHeader = ({ headerDetails, questionsList }) => {
  // safer total marks
  const totalMarks = Object.values(questionsList || {}).reduce(
    (total, group) => {
      const m = parseInt(group?.marks, 10);
      return total + (Number.isFinite(m) ? m : 0);
    },
    0
  );

  return (
    <View>
      {/* Top bar with logo + school + address */}
      <View
        style={tw(
          "w-full flex flex-row justify-between items-center mb-2 border-b border-slate-800"
        )}
      >
        <View>
          {headerDetails?.logo ? (
            <Image
              style={{ width: 70, height: 70, objectFit: "contain" }}
              src={headerDetails.logo}
            />
          ) : (
            <Text>No Logo</Text>
          )}
        </View>

        <View style={[tw("w-full text-center"), { paddingHorizontal: 10 }]}>
          <Text style={tw("text-[25px] leading-5 font-serif font-bold mb-1")}>
            {headerDetails?.school_name || "School Name"}
          </Text>
          <Text style={tw("text-[12px] text-slate-600")}>
            {headerDetails?.address || "School Address"}
          </Text>
        </View>
      </View>

      {/* Meta row */}
      <View style={tw("flex flex-row justify-between items-center w-full")}>
        <View>
          <Text style={tw("text-sm font-serif font-bold")}>
            STD : {headerDetails?.std ?? "N/A"}
          </Text>
          <Text style={tw("text-sm font-serif font-bold")}>
            DAY : {headerDetails?.day ?? "N/A"}
          </Text>
        </View>

        <View>
          <Text style={tw("text-sm font-serif font-bold")}>
            SUBJECT : {headerDetails?.subject ?? "N/A"}
          </Text>
          <Text style={tw("text-sm font-serif font-bold")}>
            DATE :{" "}
            {headerDetails?.date
              ? dayjs(headerDetails.date).format("DD-MM-YYYY")
              : "N/A"}
          </Text>
        </View>

        <View>
          <Text style={tw("text-sm font-serif font-bold")}>
            TOTAL MARKS : {totalMarks}
          </Text>
          <Text style={tw("text-sm font-serif font-bold")}>
            TIME : {headerDetails?.timing ?? "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PeparHeader;
