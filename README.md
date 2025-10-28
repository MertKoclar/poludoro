# Poludoro - Minimalist Pomodoro Zamanlayıcı

Kişisel kullanımım için geliştirdiğim minimalist bir Pomodoro (Poludoro) zamanlayıcı uygulamasıdır. Özellikle ders çalışırken veya odaklanmam gereken işler yaparken zamanı verimli yönetmek ve dikkat dağınıklığını önlemek için tasarladım.

Uygulama, modern web teknolojileri kullanılarak temiz, akıcı animasyonlara sahip ve bütünüyle karanlık moda uygun bir arayüzle oluşturulmuştur.

## 🚀 Demo

Uygulamanın canlı demosuna buradan ulaşabilirsiniz:

[https://poludoro.mertkoclar.com](https://poludoro.mertkoclar.com/)

## ✨ Özellikler

* **Dinamik Modlar:** Pomodoro, Kısa Mola ve Uzun Mola modları arasında geçiş.
* **Otomatik Döngü:** 4 Pomodoro seansından sonra otomatik olarak Uzun Mola moduna geçiş.
* **PWA Desteği (Yüklenebilir):** Çevrimdışı (internet olmadan) çalışabilir ve mobil/masaüstü cihazlara bir uygulama gibi yüklenebilir ("Ana Ekrana Ekle").
* **Akıcı Animasyonlar:** Geri sayım sırasındaki rakam değişimleri ve mod geçişleri için Framer Motion ile zenginleştirilmiş animasyonlar.
* **Kişiselleştirme:** Açılır ayar modalı sayesinde Pomodoro, Kısa Mola ve Uzun Mola sürelerini slider (kaydırıcı) ile kolayca ayarlayabilme.
* **Güvenlik Onayı:** Zamanlayıcı aktifken modu değiştirmek veya oturumu sıfırlamak istendiğinde, animasyonlu bir onay modalı ile kullanıcıyı uyarır.
* **Dinamik Tema:** Aktif moda (Pomodoro, Mola) göre değişen, odaklanmayı kolaylaştıran arka plan renkleri.
* **Modern & Duyarlı Tasarım:** Tailwind CSS ile oluşturulmuş temiz, mobil ve masaüstü cihazlarla uyumlu (responsive) arayüz.

## 🛠️ Kullanılan Teknolojiler

* **React** (UI Kütüphanesi)

* **TypeScript** (Yazılım Dili)

* **Vite** (Geliştirme Ortamı) + **SWC** (Compiler)

* **Tailwind CSS** (Styling)

* **Framer Motion** (Animasyonlar)

* **React Icons** (İkonlar)

## 🖥️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz:
1. Depoyu klonlayın (veya dosyaları indirin):

```bash
   git clone [REPO_URL]
   cd poludoro-app
```

2. Gerekli paketleri yükleyin:

```bash
   npm install
```

3. Geliştirme sunucusunu başlatın:

```bash
   npm run dev
```

Uygulama varsayılan olarak ```http://localhost:5173``` üzerinde çalışacaktır.
