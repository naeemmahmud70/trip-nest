import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongo";
import { amenitiesModel } from "@/models/amenities-model";
import { replaceMongoIdInArray } from "@/utils/data-util";

export async function GET() {
  try {
    await dbConnect();

    const amenities = await amenitiesModel.find().lean();

    return NextResponse.json(
      {
        success: true,
        count: amenities.length,
        data: replaceMongoIdInArray(amenities),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching amenities:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch amenities",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
