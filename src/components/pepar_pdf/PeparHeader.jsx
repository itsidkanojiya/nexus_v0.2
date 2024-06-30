import { Image, Text, View } from "@react-pdf/renderer";
import React from "react";
import { tw } from "../../constants/tw.confing";

const PeparHeader = ({ headerDetails }) => {
  console.log("PeparHeader - headerDetails:", headerDetails); // Debugging log

  return (
    <View>
      <View style={tw("w-full flex flex-row justify-between items-center gap-4 mb-2 border-b border-slate-800")}>
        <View>{headerDetails?.logo ? <Image style={tw("h-24 object-contain")} src={headerDetails.logo} /> : <Text>No Logo</Text>}</View>
        <View style={tw("w-full text-center")}>
          <Text style={tw("text-2xl leading-5 font-serif font-bold mb-0.5")}>{headerDetails?.schoolName || "Default School Name"}</Text>
          <Text style={tw("text-sm text-slate-600")}>{headerDetails?.schoolAddress || "Default School Address"}</Text>
        </View>
      </View>
      <View style={tw("flex flex-row justify-between items-center w-full")}>
        <View>
          <Text style={tw("text-sm font-serif font-bold")}>STD : {headerDetails?.details?.standard || "N/A"}</Text>
          <Text style={tw("text-sm font-serif font-bold")}>DAY : {headerDetails?.details?.day || "N/A"}</Text>
        </View>
        <View>
          <Text style={tw("text-sm font-serif font-bold")}>SUBJECT : {headerDetails?.details?.subject || "N/A"}</Text>
          <Text style={tw("text-sm font-serif font-bold")}>DIV : {headerDetails?.details?.division || "N/A"}</Text>
        </View>
        <View>
          <Text style={tw("text-sm font-serif font-bold")}>DATE : {headerDetails?.details?.date || "N/A"}</Text>
          <Text style={tw("text-sm font-serif font-bold")}>TIME : {headerDetails?.details?.time || "N/A"}</Text>
        </View>
      </View>
    </View>
  );
};

export default PeparHeader;
