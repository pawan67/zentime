import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AboutCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>

      <CardContent>
        Created by{" "}
        <Link
          className=" underline font-semibold"
          href="https://pawan67.vercel.app"
          target="_blank"
        >
          Pawan Tamada
        </Link>{" "}
        using{" "}
        <Link
          className=" underline font-semibold"
          href="https://nextjs.org"
          target="_blank"
        >
          Next.js
        </Link>{" "}
        .
      </CardContent>
    </Card>
  );
};

export default AboutCard;
