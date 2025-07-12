# README.md

# Hayvan Kaşifi AR Eğitimi

**Hayvan Kaşifi**, çocukların artırılmış gerçeklik (AR) ortamında hayvanları tanımasına ve quiz sistemiyle bilgilerini pekiştirmesine olanak veren bir mobil oyundur.

**Trello linki: https://trello.com/b/akKCy68q/hayvan-kasifi

---

## İçindekiler
1. [Proje Özeti](#proje-özeti)
2. [Özellikler](#özellikler)
3. [Gereksinimler](#gereksinimler)
4. [Proje Planlama](#proje-planlama)
5. [Diyagramlar](#diyagramlar)
6. [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
7. [Kurulum & Çalıştırma](#kurulum--çalıştırma)

---

## Proje Özeti
- **Amaç:** AR yüzey tespiti ile yerleştirilen 3B hayvan modelleri üzerinden quiz soruları sunmak; çocukların öğrenme motivasyonunu puan, seviye ve rozet kazanımları ile desteklemek.
- **Hedef Platformlar:** Android (ARCore), iOS (ARKit)

---

## Özellikler
- **Hayvan Spawn:** Kullanıcı yüzeye dokunduğunda rasgele hayvan modeli yerleştirilir.
- **Quiz Sistemi:** Her hayvan için 3 şıklı soru. Doğru işaretleme puan kazandırır, 3 soruda en az 2 doğru yanıt seviye atlatır.
- **Seviye & Puan Yönetimi:** Doğru cevap sayısına göre seviye artırılır veya tekrar oynatılır.
- **Rozet Sistemi:** Belirli başarı koşullarında (ör. 5 seviye atlama) rozet kazanımı.
- **Kalıcı Veri:** Puan, seviye ve rozetler lokal olarak saklanır.

---

## Gereksinimler
- **Unity:** 2020.3 LTS veya üzeri
- **AR Foundation:** ARCore & ARKit desteği
- **Target SDK:** Android API ≥ 24, iOS ≥ 12
- **Depolama:** PlayerPrefs veya küçük JSON dosyası

---

## Proje Planlama
- Gereksinim Analizi (Fonksiyonel & Non-Fonksiyonel)
- Use Case Diyagramı ve senaryolar
- Sınıf (Class) Diyagramı
- SWOT Analizi (Güçlü/Zayıf Yönler, Fırsatlar/Tehditler)

---

## Diyagramlar
- **Use Case Diyagramı:** [Use Case Diyagramı Görseli (trello)](https://trello.com/c/c0kva72r/1-use-case-diyagram%C4%B1)
- **Sınıf Diyagramı:** [Class Diyagramı Görseli (trello)](https://link.to/class-diagram](https://trello.com/c/nF9KNAcJ/2-uml-class-diyagram%C4%B1))
- **SWOT Analizi:** [SWOT Analizi Görseli (trello)](https://link.to/class-diagram](https://trello.com/c/nF9KNAcJ/2-uml-class-diyagram%C4%B1)](https://trello.com/c/ehHZ4MNc/3-swot-anali%CC%87zi%CC%87))

---

## Kullanılan Teknolojiler
- **React Native ve Expo:** 
- **PlantUML & draw.io:** Diyagram üretimi ve görselleştirme
- **PlayerPrefs / JSON:** Kalıcı veri saklama

---

## 🚀 Kurulum Adımları

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/kadir28566/hayvanKasifi.git
cd hayvanKasifi
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Expo CLI'yi Yükleyin (Eğer yüklü değilse)
```bash
npm install -g @expo/cli
```


### 4. Uygulamayı Başlatın
```bash
npm start
```
## Mobil İndirme

- **Reponun releases kısmında apk linki mevcuttur.**
