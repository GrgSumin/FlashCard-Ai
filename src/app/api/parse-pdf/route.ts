import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a PDF file" }, { status: 400 });
    }

    // 20MB limit
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: "PDF too large (max 20MB)" }, { status: 400 });
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const { text, totalPages } = await extractText(buffer);
    const fullText = text.join("\n").trim();

    if (!fullText || fullText.length < 50) {
      return NextResponse.json(
        { error: "Could not extract enough text from this PDF. Try a different file or paste text manually." },
        { status: 400 }
      );
    }

    // Trim to 50,000 chars to stay within reasonable AI limits
    const trimmed = fullText.slice(0, 50000);

    return NextResponse.json({ text: trimmed, pages: totalPages });
  } catch {
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
