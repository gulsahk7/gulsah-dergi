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
    const parlaklik = 6 + (sira / 300) * 22;
    kalem.fillStyle = "hsl(28, 70%, " + parlaklik + "%)";
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
  parilti.addColorStop(0, "rgba(255, 230, 170, 0.55)");
  parilti.addColorStop(0.4, "rgba(255, 190, 60, 0.25)");
  parilti.addColorStop(1, "rgba(255, 150, 0, 0)");
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
        "hsl(30, 90%, 30%)",
        "hsl(38, 95%, 45%)",
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
        "hsl(35, 95%, 40%)",
        "hsl(48, 100%, 58%)",
      );
    }
  }
}
function sapYapragiCiz(x, y, aci, boy) {
  kalem.save();
  kalem.translate(x, y);
  kalem.rotate(aci);
  const renk = kalem.createLinearGradient(0, 0, boy, 0);
  renk.addColorStop(0, "hsl(130, 50%, 18%)");
  renk.addColorStop(1, "hsl(100, 50%, 36%)");
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
  sapRengi.addColorStop(0, "hsl(130, 45%, 12%)");
  sapRengi.addColorStop(1, "hsl(105, 45%, 30%)");
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
  kalem.fillStyle = "hsl(25, 60%, 5%)";
  tohumCiz(0, 0, 75);
  for (let s = 0; s < adet; s++) {
    aycicegiTohumu(0, 0, s);
  }

  kalem.restore();
}
let i = 0;

function sahneyiCiz() {
  kalem.clearRect(0, 0, genislik, yukseklik);
  isikCiz();
  const ilerleme = i / 300;

  const solX = genislik * (telefon ? 0.13 : 0.2);
  const sagX = genislik * (telefon ? 0.87 : 0.8);
  const zeminY = yukseklik * (telefon ? 0.22 : 0.4);

  aycicegiCiz(solX, zeminY, ilerleme, i);
  aycicegiCiz(sagX, zeminY, ilerleme, i);

  if (i < 300) {
    i++;
    requestAnimationFrame(sahneyiCiz);
  }
}

sahneyiCiz();
