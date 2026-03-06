import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrGenerator = ({ value }) => (
  <div>
    <QRCodeCanvas value={value} size={256} />
  </div>
);

export default QrGenerator;
