# BB610 WATER Admin — OWNER DEPLOYMENT PACKAGE

Цель: владелец скачивает готовый пакет из GitHub, загружает его на существующий BB610 VPS и запускает **один** установщик. SSH-доступ разработчику не нужен.

## Самая короткая инструкция

1. Скачайте ZIP `BB610_WATER_ADMIN_OWNER_DEPLOYMENT_PACKAGE.zip` из последнего успешного workflow **Build WATER Admin Owner Package**.
2. Распакуйте ZIP на VPS, например в `/root/bb610-water-admin-owner/`.
3. Перед первым запуском убедитесь, что DNS A-записи:
   - `admin.water.bb610.com.ua`
   - `api.water.bb610.com.ua`
   указывают на публичный IPv4 этого VPS. Если ещё не указывают — установщик сам это покажет и остановится **до изменений**.
4. Выполните одно действие:

```sh
cd /root/bb610-water-admin-owner
sudo bash ./install-or-update.sh
```

Установщик сначала делает read-only preflight. Если есть конфликт с текущим Nginx, Docker, портами, директориями или DNS — он завершится **до изменения сервера** и напечатает причину.

## Что делает установщик автоматически

После успешного preflight и явного подтверждения `DEPLOY` он:

- не трогает BB610 Market и другие существующие приложения;
- не меняет `water.bb610.com.ua` и не подключает публичный WATER-сайт к API;
- создаёт отдельный runtime в `/opt/bb610-water-admin/`;
- создаёт persistent PostgreSQL storage в `/var/lib/bb610-water-admin/postgres/`;
- создаёт protected backup storage `/var/backups/bb610-water-admin/`;
- генерирует DB/JWT/bootstrap secrets локально на VPS и не печатает их;
- поднимает PostgreSQL 16 + Admin API через Docker Compose;
- устанавливает принятую Admin v2 UI;
- создаёт owner/admin `admin.bb610@gmail.com` через secure bootstrap;
- при первом install попросит владельца ввести финальный пароль **скрытым вводом прямо на VPS**;
- после создания owner/admin удаляет bootstrap secret из runtime env;
- получает TLS сертификаты для двух новых поддоменов через Certbot webroot;
- устанавливает отдельный Nginx config только для `admin.water...` и `api.water...`;
- включает ежедневный backup timer;
- делает первый backup и disposable restore drill;
- проверяет `/health` и commercial invariant `21 = 15 APPROVED + 6 PRICE_ON_REQUEST`.

## Что НЕ делает установщик

- не изменяет файлы BB610 Market;
- не перезапускает/останавливает BB610 Market service;
- не меняет существующие Nginx server blocks других сайтов;
- не открывает PostgreSQL наружу;
- не меняет `water.bb610.com.ua`;
- не активирует public commercial-data cutover;
- не переносит review/test credentials в production;
- не пишет реальный owner password в repository, frontend, документацию, CI или логи.

## Внешняя предпосылка: DNS

DNS управляется вне VPS, поэтому серверный установщик не может безопасно создать A-записи без credentials DNS-провайдера. Это единственная внешняя операция.

При запуске preflight установщик определяет публичный IPv4 VPS и проверяет оба имени. Если DNS ещё не готов, он напечатает ожидаемый IP и завершится без изменений. После обновления DNS просто повторите ту же команду:

```sh
sudo bash ./install-or-update.sh
```

Для первого TLS выпуска рекомендуется обычная прямая A-запись на VPS. Если используется DNS proxy/CDN, временно отключите proxy для этих двух имён на время первичного выпуска сертификата или используйте существующий BB610 ACME-процесс вручную.

## Требования к уже существующему VPS

Preflight требует наличие и активное состояние:

- Linux + root/sudo;
- Docker Engine;
- Docker Compose plugin;
- host Nginx;
- Certbot;
- `curl`, `openssl`, `python3`, `getent`, `ss`, `systemctl`.

Установщик **не устанавливает системные пакеты автоматически**, чтобы не повредить существующую инфраструктуру BB610.

## Fresh install vs update

Один и тот же `install-or-update.sh` используется и для первого install, и для последующих обновлений.

На первом install создаётся marker:

`/opt/bb610-water-admin/.bb610-water-admin-managed`

На update установщик принимает существующую директорию только при наличии этого marker. Любая похожая, но неизвестная директория считается конфликтом, и preflight останавливается.

Production env при update сохраняется; DB/JWT/owner credentials не генерируются заново.

## Owner/admin

Production owner/admin:

`admin.bb610@gmail.com`

Review/test accounts не являются production account и не переносятся.

При первом install установщик попросит финальный owner password два раза скрытым вводом. Минимум 16 символов. Значение используется только в памяти процесса для password rotation и не выводится на экран.

## После успешного запуска

Ожидаемые URL:

- Admin: `https://admin.water.bb610.com.ua/`
- API health: `https://api.water.bb610.com.ua/health`
- Public commercial endpoint: `https://api.water.bb610.com.ua/public/commercial`

Важно: наличие public commercial endpoint **не означает**, что `water.bb610.com.ua` уже читает его. Cutover остаётся отключённым до отдельного решения владельца.

## Если preflight остановился

Ничего существующего менять не нужно наугад. Скопируйте только текст блока `PREFLIGHT FAILED` без паролей/secrets. Установщик специально не пишет конфигурацию до завершения preflight.

## Полный инженерный runbook

В пакете также находится:

`docs/website/BB610_WATER_ADMIN_PRODUCTION_RUNBOOK_R1.md`

Для обычной установки владельцу достаточно этого README и одной команды `sudo bash ./install-or-update.sh`.
