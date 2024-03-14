import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const apiKey = "asdasd";

  const respose = await fetch("api", { headers: { apiKey } });
  const data = await respose.json();

  res.json(data);
};
