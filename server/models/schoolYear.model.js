import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schoolYearSchema = new Schema({
  ten_nk: {
    type: String,
    enum: ["2020 - 2021", "2021 - 2022", "2022 - 2023"],
    default: "2022 - 2023",
    required: true,
  },
});
//export collection name 'schoolYear' storing schoolYear info
const SchoolYear = mongoose.model("schoolYears", schoolYearSchema);
export default SchoolYear;
