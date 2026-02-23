export default function handler(req, res) {

  const forwarded = req.headers["x-forwarded-for"];

  const ip = forwarded
    ? forwarded.split(",")[0]
    : req.socket?.remoteAddress || "Indisponível";

  res.status(200).json({
    ip: ip,
    userAgent: req.headers["user-agent"],
    country: req.headers["x-vercel-ip-country"],
    city: req.headers["x-vercel-ip-city"]
  });
}
