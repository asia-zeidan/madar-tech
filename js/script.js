document.addEventListener("DOMContentLoaded", function () {
    // 1. القائمة المتنقلة في الموبايل
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll("#navMenu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // 2. إرسال نموذج التواصل عبر واتساب
    const whatsappForm = document.getElementById("whatsappForm");
    whatsappForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("userEmail").value.trim();
        const phone = document.getElementById("userPhone").value.trim();
        const message = document.getElementById("userMessage").value.trim();

        const madarNumber = "970590000000";

        const text = `مرحباً مدار تك، لدي استفسار:%0A` +
                     `*الاسم:* ${name}%0A` +
                     `*البريد الإلكتروني:* ${email}%0A` +
                     `*رقم الهاتف:* ${phone}%0A` +
                     `*الرسالة:* ${message}`;

        window.open(`https://wa.me{madarNumber}?text=${text}`, "_blank");
    });

    // 3. زر "اعرف المزيد" في البرامج
    document.querySelectorAll(".prog-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const progName = this.getAttribute("data-prog");
            document.getElementById("userMessage").value = `مرحباً، أرغب في الاستفسار عن برنامج: ${progName}`;
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        });
    });
});
