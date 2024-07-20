function Notifications() {
  return Notification.requestPermission().then(function (result) {
    if (result === "granted") {
      // ایجاد یک نوتیفیکیشن
      let notification = new Notification("پیام جدید", {
        body: "شما یک پیام جدید در تلگرام دارید",
        icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
      });

      // رفتار در صورت کلیک بر روی نوتیفیکیشن
      notification.onclick = function () {
        // رفتار در صورت کلیک، مثلا باز کردن وب اپلیکیشن تلگرام
        window.open("https://web.telegram.org/");
      };
    }
  });
}
