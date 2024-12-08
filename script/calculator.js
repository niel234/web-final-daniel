document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("calculator-display");
    let currentInput = "0"; // Mulai dengan "0" untuk input
    let operator = null;
    let previousValue = null;
    let isNewInput = false; // Menandakan input baru setelah operasi

    // Fungsi untuk memperbarui tampilan
    function updateDisplay(value) {
        display.value = value.length > 16 ? value.slice(0, 16) : value; // Batasi tampilan hingga 16 digit
    }

    // Fungsi untuk melakukan reset kalkulator
    function resetCalculator() {
        currentInput = "0";
        operator = null;
        previousValue = null;
        isNewInput = false;
        updateDisplay(currentInput);
    }

    // Clear display (C)
    document.getElementById("calc-clear").addEventListener("click", resetCalculator);

    // Menangani tombol angka dan desimal
    document.querySelectorAll(".calc-btn:not(.operator)").forEach((button) => {
        button.addEventListener("click", () => {
            if (isNewInput) {
                currentInput = button.dataset.value; // Reset input ke angka yang ditekan
                isNewInput = false;
            } else if (currentInput === "0" && button.dataset.value !== ".") {
                currentInput = button.dataset.value; // Ganti "0" dengan angka pertama
            } else if (button.dataset.value === "." && !currentInput.includes(".")) {
                currentInput += button.dataset.value; // Tambahkan desimal hanya jika belum ada
            } else if (currentInput.length < 16) {
                currentInput += button.dataset.value; // Tambahkan angka jika panjang input belum 16 digit
            }
            updateDisplay(currentInput);  // Perbarui tampilan
        });
    });

    // Logika tombol operator
    document.querySelectorAll(".calc-btn.operator").forEach((button) => {
        button.addEventListener("click", () => {
            if (currentInput === "" || currentInput === "0") return; // Jangan izinkan operator tanpa angka

            if (previousValue === null) {
                previousValue = parseFloat(currentInput); // Set nilai pertama jika belum ada previousValue
            } else if (operator !== null) {
                previousValue = calculate(previousValue, parseFloat(currentInput), operator); // Lakukan perhitungan sebelumnya
            }

            operator = button.dataset.value; // Set operator saat ini
            isNewInput = true; // Tandai bahwa input selanjutnya adalah angka baru
            updateDisplay(previousValue.toString()); // Tampilkan hasil sementara
        });
    });

    // Logika tombol "="
    document.getElementById("calc-equals").addEventListener("click", () => {
        if (operator && currentInput !== "") {
            const result = calculate(previousValue, parseFloat(currentInput), operator);
            updateDisplay(result.toString()); // Tampilkan hasil perhitungan
            previousValue = result; // Simpan hasil perhitungan untuk perhitungan berikutnya
            currentInput = "0"; // Reset input setelah perhitungan selesai
            operator = null; // Reset operator
        }
    });

    // Fungsi kalkulasi berdasarkan operator
    function calculate(a, b, op) {
        switch (op) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                if (b === 0) {
                    return "Error"; // Menangani pembagian dengan nol
                }
                return a / b;
            default:
                return b; // Jika operator tidak valid, kembalikan nilai b
        }
    }
});
