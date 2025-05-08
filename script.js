let selectedIllustration = "";

  function getL_ILL01(t) {
    if (t < 3.2) return "Not specified";
    if (t < 4.5) return "2.5";
    if (t < 6) return "3";
    if (t < 8) return "4";
    return "-";
  }

  function getL_ILL02(t) {
    if (t < 3.2) return "Not specified";
    if (t < 4.5) return "2.5";
    if (t < 6) return "3";
    if (t < 8) return "4";
    if (t < 9) return "6";
    if (t < 12) return "7";
    if (t < 14) return "9";
    if (t < 16) return "11";
    if (t < 19) return "13";
    return "-";
  }

  function getL_ILL03(t) {
    if (t < 9) return "Not specified";
    if (t < 12) return "5";
    if (t < 14) return "7";
    if (t < 16) return "8";
    if (t < 19) return "10";
    if (t < 22) return "12";
    if (t < 25) return "14";
    return "16";
  }

  function getL_ILL04(t) {
    if (t < 3.2) return "Not specified";
    if (t < 4.5) return "3";
    if (t < 6) return "4";
    if (t < 8) return "5";
    if (t < 9) return "6";
    if (t < 12) return "7";
    if (t < 14) return "9";
    if (t < 16) return "11";
    if (t < 19) return "13";
    return "-";
  }

  function getL_ILL05(t) {
    if (t < 4.5) return "Not specified";
    if (t < 6) return "3";
    if (t < 9) return "4";
    if (t < 12) return "5";
    if (t < 14) return "6";
    if (t < 16) return "7";
    if (t < 19) return "8";
    if (t < 22) return "9";
    if (t < 25) return "10";
    return "11";
  }

  function getL_ILL06(t) {
    if (t < 3.2) return "Not specified";
    if (t < 4.5) return "2.5";
    if (t < 6) return "3";
    if (t < 8) return "4";
    return "-";
  }

  function getD_ByFormula(t, L, ill) {
    if (L === "Not specified") return (t * 0.2).toFixed(2);
    if (L === "-") return "1.50";
    const Lval = parseFloat(L);

    if (ill === "ILL-02" && Lval > 8) return "1.50";
    if (ill === "ILL-03" && (["5", "7", "8"].includes(L) || Lval >= 8)) return Lval < 8 ? (Lval * 0.2).toFixed(2) : "1.50";
    if (ill === "ILL-04" && (["3", "4", "5", "6", "7"].includes(L) || Lval >= 8)) return Lval < 8 ? (Lval * 0.2).toFixed(2) : "1.50";
    if (ill === "ILL-05" && (Lval < 8)) return (Lval * 0.2).toFixed(2);
    if (ill === "ILL-05" && Lval >= 8) return "1.50";
    if (ill === "ILL-06" && ["2.5", "3", "4"].includes(L)) return (Lval * 0.2).toFixed(2);

    return "1.50";
  }

  function selectIllustration(ill) {
    selectedIllustration = ill;
    document.getElementById("illustrationImage").src = ill + ".png";
    document.getElementById("illustrationImage").style.display = "block";
    calculate();
  }
  function calculate() {
  const t = parseFloat(document.getElementById("thickness").value);
  if (!selectedIllustration || isNaN(t)) {
    document.getElementById("tVal").textContent = "-";
    document.getElementById("lVal").textContent = "-";
    document.getElementById("dVal").textContent = "-";
    return;
  }

  let L = "-";
  switch (selectedIllustration) {
    case "ILL-01": L = getL_ILL01(t); break;
    case "ILL-02": L = getL_ILL02(t); break;
    case "ILL-03": L = getL_ILL03(t); break;
    case "ILL-04": L = getL_ILL04(t); break;
    case "ILL-05": L = getL_ILL05(t); break;
    case "ILL-06": L = getL_ILL06(t); break;
  }

  const d = getD_ByFormula(t, L, selectedIllustration);

  document.getElementById("tVal").textContent = t.toFixed(2);
  document.getElementById("lVal").innerHTML =
    L === "Not specified" ? '<span class="red-text">Not specified</span>' : L;
  document.getElementById("dVal").innerHTML =
    d === "Not specified" ? '<span class="red-text">Not specified</span>' : d;
}