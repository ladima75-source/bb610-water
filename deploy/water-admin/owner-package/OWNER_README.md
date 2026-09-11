# BB610 WATER Admin — OWNER DEPLOYMENT PACKAGE

Цель: владелец скачивает готовый пакет из GitHub, загружает его на существующий BB610 VPS `173.242.53.156` рядом с BB610 Market и запускает **один** установщик. SSH-доступ разработчику не нужен.

## OWNER GO — порядок действий

### 1. Сначала ADM.TOOLS

Создайте две **A-записи**:

- `admin.water.bb610.com.ua` → `173.242.53.156`
- `api.water.bb610.com.ua` → `173.242.53.156`

Не меняйте существующие записи:

- `market.bb610.com.ua` → GitHub Pages
- `api.market.bb610.com.ua` → `173.242.53.156`
- `water.bb610.com.ua` → GitHub Pages

Дождитесь, пока обе новые записи резолвятся в `173.242.53.156`.

### 2. Скачайте OWNER package

Скачайте `BB610_WATER_ADMIN_OWNER_DEPLOYMENT_PACKAGE.zip` из последнего успешного workflow **Build WATER Admin Owner Package** и распакуйте на VPS, например:

`/root/bb610-water-admin-owner/`

### 3. Выполните одну команду

```sh
cd /root/bb610-water-admin-owner
sudo bash ./install-or-update.sh
```

Установщик сначала делает **только read-only preflight**. До строки `PREFLIGHT PASS` и ввода владельцем слова `DEPLOY` сервер не изменяется.

Если найден конфликт с Nginx, Docker, портом `18080`, WATER deployment paths, systemd units, DNS или ownership markers, установщик завершится без deployment и напечатает `PREFLIGHT FAILED`.

После `PREFLIGHT PASS` внимательно убедитесь, что показан ожидаемый VPS IP `173.242.53.156`, затем введите:

`DEPLOY`

## Shared VPS safety

WATER Admin рассчитан на совместное размещение с существующим BB610 Market на том же VPS.

Он использует только:

- Nginx names `admin.water.bb610.com.ua` и `api.water.bb610.com.ua`;
- API loopback `127.0.0.1:18080`;
- Docker Compose project/network `bb610-water-admin`;
- `/opt/bb610-water-admin`;
- `/etc/bb610-water-admin`;
- `/var/lib/bb610-water-admin`;
- `/var/backups/bb610-water-admin`;
- `/var/www/bb610-water-admin-acme`;
- WATER-specific systemd backup units.

Installer никогда не должен владеть `api.market.bb610.com.ua`, `market.bb610.com.ua` или `water.bb610.com.ua`. Candidate Nginx config с такими именами блокируется safety guard.

## Atomic Nginx / TLS safety

TLS и Nginx выполняются как одна транзакция:

1. сохраняется точное предыдущее состояние WATER Nginx slot;
2. existing global `nginx -t` должен быть PASS;
3. временный ACME candidate проходит safety checks и полный `nginx -t` **до reload**;
4. Certbot использует isolated webroot и не редактирует чужие Nginx sites;
5. final WATER candidate проходит checks и `nginx -t` до reload;
6. только после успешного reload транзакция фиксируется.

При `ERR`, `INT`, `TERM`, `HUP`, ошибке Certbot или невалидном candidate installer автоматически:

- возвращает предыдущий WATER Nginx файл либо удаляет новый, если до deployment его не существовало;
- повторяет `nginx -t`;
- reload-ит восстановленную конфигурацию;
- завершает deployment с ошибкой.

CI failure-injection отдельно проверяет:

- намеренно сломанный final Nginx candidate;
- Certbot failure на втором домене после успешного первого;
- interruption между TLS и final activation.

Во всех случаях исходный Nginx file должен восстановиться byte-for-byte и оставаться valid/reloaded.

## Ownership protection

Установщик не перезаписывает неизвестные существующие объекты. Managed markers проверяются для:

- `/opt/bb610-water-admin`;
- `/etc/bb610-water-admin`;
- `/var/lib/bb610-water-admin`;
- `/var/backups/bb610-water-admin`;
- `/var/www/bb610-water-admin-acme`;
- `/etc/nginx/conf.d/bb610-water-admin.conf`;
- `/etc/systemd/system/bb610-water-admin-backup.service`;
- `/etc/systemd/system/bb610-water-admin-backup.timer`.

Неизвестный непустой объект с таким именем = `PREFLIGHT FAILED`, а не автоматическая перезапись.

## Что делает установщик автоматически после DEPLOY

- не трогает BB610 Market и другие существующие приложения;
- не меняет `water.bb610.com.ua` и не подключает публичный WATER-сайт к API;
- создаёт отдельный WATER Admin runtime;
- создаёт persistent PostgreSQL storage;
- генерирует DB/JWT/bootstrap secrets локально на VPS и не печатает их;
- поднимает PostgreSQL 16 + Admin API через Docker Compose;
- устанавливает принятую Admin v2 UI;
- создаёт owner/admin `admin.bb610@gmail.com` через secure bootstrap;
- выполняет acceptance `Login → Roles → Draft → Diff → Publish → Audit → Rollback`;
- возвращает коммерческий каталог к исходному состоянию;
- удаляет временных acceptance users;
- просит владельца задать финальный пароль скрытым вводом прямо на VPS;
- удаляет bootstrap secret из runtime env;
- получает TLS через Certbot webroot;
- атомарно активирует отдельный WATER Nginx config;
- включает ежедневный backup timer;
- делает первый backup + SHA-256 + disposable restore drill;
- перезапускает только WATER API и проверяет `/health`;
- повторно проверяет invariant `21 = 15 APPROVED + 6 PRICE_ON_REQUEST`.

## Что НЕ делает установщик

- не изменяет файлы BB610 Market;
- не останавливает/перезапускает BB610 Market service;
- не заменяет Nginx server blocks других сайтов;
- не открывает PostgreSQL наружу;
- не открывает API port `18080` наружу;
- не меняет `water.bb610.com.ua`;
- не активирует public commercial-data cutover;
- не переносит review/test credentials в production;
- не пишет реальный owner password в repository, frontend, документацию, CI или логи;
- не меняет firewall rules.

## Firewall assumption

Installer firewall не редактирует. Для первого Certbot webroot issuance существующий VPS должен принимать обычный HTTP/HTTPS трафик на host Nginx по портам 80/443. Если внешний firewall блокирует ACME challenge, Certbot завершится ошибкой, а Nginx transaction автоматически вернёт исходную конфигурацию.

PostgreSQL host port не публикуется. WATER API публикуется только на `127.0.0.1:18080` и снаружи доступен исключительно через Nginx HTTPS.

## Требования к уже существующему VPS

Preflight требует наличие и активное состояние:

- Linux + root/sudo;
- Docker Engine;
- Docker Compose plugin;
- host Nginx;
- Certbot;
- `curl`, `openssl`, `python3`, `getent`, `ss`, `systemctl`.

Установщик **не устанавливает системные пакеты автоматически**, чтобы не повредить существующую инфраструктуру BB610.

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

Важно: наличие public commercial endpoint **не означает**, что `water.bb610.com.ua` уже читает его. Public cutover остаётся отключённым.

## Если preflight или deployment остановился

Если это `PREFLIGHT FAILED`, никаких deployment changes ещё не было. Скопируйте только текст блока ошибки без secrets.

Если ошибка произошла позже на TLS/Nginx stage, installer должен автоматически сообщить о rollback и восстановить исходное Nginx состояние. Не перезапускайте вручную другие BB610 services.

## Полный инженерный runbook

В пакете находится:

`docs/website/BB610_WATER_ADMIN_PRODUCTION_RUNBOOK_R1.md`

Для обычной установки владельцу достаточно этого README и одной команды `sudo bash ./install-or-update.sh`.
