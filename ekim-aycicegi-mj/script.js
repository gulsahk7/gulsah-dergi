const tuval = document.getElementById("sahne");
const kalem = tuval.getContext("2d");

const yogunluk = window.devicePixelRatio || 1;
const genislik = tuval.clientWidth;
const yukseklik = tuval.clientHeight;
tuval.width = genislik * yogunluk;
tuval.height = yukseklik * yogunluk;
kalem.scale(yogunluk, yogunluk);
const telefon = genislik < 600;
const olcek = telefon ? 0.4 : Math.min(1, genislik / 1500);
const merkezY = yukseklik / 2;

const isikX = genislik / 2;
const isikY = 0;

function tohumCiz(x, y, r) {
  kalem.beginPath();
  kalem.arc(x, y, r, 0, Math.PI * 2);
  kalem.fill();
}

function aycicegiTohumu(mx, my, sira) {
  const aci = (sira * 137.5 * Math.PI) / 180;
  const uzaklik = 4.2 * Math.sqrt(sira);
  const x = mx + Math.cos(aci) * uzaklik;
  const y = my + Math.sin(aci) * uzaklik;

  if (sira === 22) {
    kalem.fillStyle = "rgb(200, 30, 30)";
    tohumCiz(x, y, 4);
  } else {
    const parlaklik = 25 + (sira / 300) * 45;
    kalem.fillStyle = "hsl(0, 0%, " + parlaklik + "%)";
    tohumCiz(x, y, 2.4 + (sira / 300) * 1.2);
  }
}

function isikCiz() {
  const parilti = kalem.createRadialGradient(
    isikX,
    isikY,
    0,
    isikX,
    isikY,
    200,
  );
  parilti.addColorStop(0, "rgba(255, 255, 255, 0.5)");
  parilti.addColorStop(0.4, "rgba(255, 255, 255, 0.2)");
  parilti.addColorStop(1, "rgba(255, 255, 255, 0)");
  kalem.fillStyle = parilti;
  kalem.fillRect(0, 0, genislik, yukseklik);
}

function araDeger(baslangic, hedef, oran) {
  return baslangic + (hedef - baslangic) * oran;
}

function yaprakCiz(aci, ic, boy, en, dipRengi, ucRengi) {
  kalem.save();
  kalem.rotate(aci);
  const renk = kalem.createLinearGradient(ic, 0, ic + boy, 0);
  renk.addColorStop(0, dipRengi);
  renk.addColorStop(1, ucRengi);
  kalem.fillStyle = renk;
  kalem.beginPath();
  kalem.moveTo(ic, 0);
  kalem.quadraticCurveTo(ic + boy / 2, -en, ic + boy, 0);
  kalem.quadraticCurveTo(ic + boy / 2, en, ic, 0);
  kalem.fill();
  kalem.restore();
}

const YAPRAK_SAYISI = 75;
const yaprakBoylari = [];
const yaprakEnleri = [];
for (let k = 0; k < YAPRAK_SAYISI; k++) {
  yaprakBoylari.push(1.2 + Math.random() * 0.4);
  yaprakEnleri.push(0.9 + Math.random() * 0.4);
}

function yapraklariCiz(ilerleme) {
  const ic = 70;
  const acilma = Math.max(0, (ilerleme - 0.4) / 0.6);
  if (acilma === 0) {
    return;
  }
  for (let k = 0; k < YAPRAK_SAYISI; k++) {
    const aci = (k * 137.5 * Math.PI) / 180;
    const boy = yaprakBoylari[k];
    const en = yaprakEnleri[k];
    if (k % 2 === 0) {
      yaprakCiz(
        aci,
        ic,
        48 * acilma * boy,
        11 * en,
        "hsl(0, 0%, 45%)",
        "hsl(0, 0%, 75%)",
      );
    }
  }
  for (let k = 0; k < YAPRAK_SAYISI; k++) {
    const aci = (k * 137.5 * Math.PI) / 180;
    const boy = yaprakBoylari[k];
    const en = yaprakEnleri[k];
    if (k % 2 === 1) {
      yaprakCiz(
        aci,
        ic,
        44 * acilma * boy,
        10 * en,
        "hsl(0, 0%, 65%)",
        "hsl(0, 0%, 95%)",
      );
    }
  }
}
function sapYapragiCiz(x, y, aci, boy) {
  kalem.save();
  kalem.translate(x, y);
  kalem.rotate(aci);
  const renk = kalem.createLinearGradient(0, 0, boy, 0);
  renk.addColorStop(0, "hsl(0, 0%, 30%)");
  renk.addColorStop(1, "hsl(0, 0%, 60%)");
  kalem.fillStyle = renk;
  kalem.beginPath();
  kalem.moveTo(0, 0);
  kalem.quadraticCurveTo(boy / 2, -boy / 3, boy, 0);
  kalem.quadraticCurveTo(boy / 2, boy / 3, 0, 0);
  kalem.fill();
  kalem.restore();
}
const CIZGI_SAYISI = 8;
const cizgiKaymalari = [];
for (let c = 0; c < CIZGI_SAYISI; c++) {
  cizgiKaymalari.push(Math.random() * 8 - 4);
}
function aycicegiCiz(mx, my, ilerleme, adet) {
  const hedefYon = Math.atan2(isikY - my, isikX - mx);
  const yon = araDeger(hedefYon + Math.PI, hedefYon, ilerleme);

  const boyunX = mx + Math.cos(yon) * 20 * olcek;
  const boyunY = my + Math.sin(yon) * 20 * olcek;
  const basX = mx + Math.cos(yon) * 60 * olcek;
  const basY = my + Math.sin(yon) * 60 * olcek;

  const sapRengi = kalem.createLinearGradient(0, yukseklik, 0, basY);
  sapRengi.addColorStop(0, "hsl(0, 0%, 20%)");
  sapRengi.addColorStop(1, "hsl(0, 0%, 55%)");
  kalem.strokeStyle = sapRengi;
  kalem.lineWidth = 4;
  kalem.lineCap = "round";
  kalem.beginPath();
  kalem.moveTo(mx, yukseklik);
  kalem.quadraticCurveTo(mx, my, boyunX, boyunY);
  kalem.lineTo(basX, basY);
  kalem.stroke();

  const yaprakY = my + (yukseklik - my) * 0.5;
  sapYapragiCiz(mx, yaprakY, -0.6, 60 * olcek);
  sapYapragiCiz(mx, yaprakY + 22 * olcek, Math.PI + 0.6, 52 * olcek);

  kalem.save();
  kalem.translate(basX, basY);
  kalem.rotate(yon);
  kalem.scale(0.55 * olcek, olcek);

  yapraklariCiz(ilerleme);
  kalem.fillStyle = "hsl(0, 0%, 8%)";
  tohumCiz(0, 0, 75);
  for (let s = 0; s < adet; s++) {
    aycicegiTohumu(0, 0, s);
  }

  kalem.restore();
}
const RAKAM_SAYISI = 40;
const rakamlar = [];
const rakamBaslangic = yukseklik * 0.06;
const rakamBitis = yukseklik * 0.38;

function rakamOlustur() {
  const x = isikX + (Math.random() - 0.5) * 120 * olcek;
  return {
    x: x,
    y: rakamBaslangic + Math.random() * 20,
    hiz: 0.2 + Math.random() * 0.3,
    kayma: (x - isikX) * 0.004,
    deger: Math.random() < 0.5 ? "0" : "1",
    boy: 10 + Math.random() * 6,
  };
}

for (let r = 0; r < RAKAM_SAYISI; r++) {
  const rakam = rakamOlustur();
  const yol = Math.random() * (rakamBitis - rakamBaslangic);
  rakam.y += yol;
  rakam.x += (rakam.kayma * yol) / rakam.hiz;
  rakamlar.push(rakam);
}

function rakamlariCiz() {
  kalem.save();
  kalem.shadowColor = "white";
  kalem.shadowBlur = 8;
  for (let r = 0; r < RAKAM_SAYISI; r++) {
    const rakam = rakamlar[r];
    rakam.y += rakam.hiz;
    rakam.x += rakam.kayma;
    const oran = (rakam.y - rakamBaslangic) / (rakamBitis - rakamBaslangic);
    if (oran >= 1) {
      rakamlar[r] = rakamOlustur();
      continue;
    }
    const saydamlik = 0.6 * Math.min(1, oran * 5) * (1 - oran);
    kalem.fillStyle = "rgba(255, 255, 255, " + saydamlik + ")";
    kalem.font = rakam.boy * olcek + 4 + "px monospace";
    kalem.fillText(rakam.deger, rakam.x, rakam.y);
  }
  kalem.restore();
}
let i = 0;

function sahneyiCiz() {
  kalem.clearRect(0, 0, genislik, yukseklik);
  isikCiz();
  rakamlariCiz();
  const ilerleme = i / 300;

  const solX = genislik * (telefon ? 0.13 : 0.2);
  const sagX = genislik * (telefon ? 0.87 : 0.8);
  const zeminY = yukseklik * (telefon ? 0.22 : 0.4);

  aycicegiCiz(solX, zeminY, ilerleme, i);
  aycicegiCiz(sagX, zeminY, ilerleme, i);

  if (i < 300) {
    i++;
  }
  requestAnimationFrame(sahneyiCiz);
}

sahneyiCiz();
