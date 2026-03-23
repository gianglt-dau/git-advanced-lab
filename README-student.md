# Git Advanced Lab — Student Guide

## Mục tiêu
Sau bài lab này, bạn sẽ luyện:
- kết nối local repo với remote repo
- push branch
- xử lý merge conflict
- dùng `stash`
- dùng `rebase`
- hoàn tác thay đổi an toàn

## Cấu trúc dự án
```text
git-advanced-lab/
├── README.md
├── package.json
├── src/
│   ├── app.js
│   ├── config.js
│   └── utils.js
└── docs/
    └── changelog.md
```

## Bước 1: Khởi tạo repo và commit đầu tiên
Chạy:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

## Bước 2: Kết nối remote
Tạo một repo trống trên GitHub hoặc GitLab, sau đó chạy:
```bash
git remote add origin <REMOTE_URL>
git push -u origin main
```

Kiểm tra remote:
```bash
git remote -v
```

## Bước 3: Tạo feature branch
Chạy:
```bash
git switch -c feature/update-env
```

Mở `src/config.js` và đổi nội dung thành:
```javascript
export function getEnv() {
  return "staging";
}
```

Commit và push:
```bash
git add src/config.js
git commit -m "Change environment to staging"
git push -u origin feature/update-env
```

## Bước 4: Fetch và xem lịch sử
Chạy:
```bash
git fetch origin
git branch -a
git log --oneline --graph --all
```

Tự trả lời:
- `fetch` khác `pull` như thế nào?
- branch local và remote-tracking branch khác nhau ra sao?

## Bước 5: Tạo merge conflict
Chuyển về `main`:
```bash
git switch main
```

Mở `src/config.js` và sửa thành:
```javascript
export function getEnv() {
  return "production";
}
```

Commit:
```bash
git add src/config.js
git commit -m "Set environment to production"
```

Quay lại nhánh feature:
```bash
git switch feature/update-env
```

Merge `main` vào branch hiện tại:
```bash
git merge main
```

Lúc này dự kiến sẽ có conflict ở `src/config.js`.

## Bước 6: Resolve conflict
Mở `src/config.js`, sửa file thành:
```javascript
export function getEnv() {
  return "production-staging";
}
```

Sau đó chạy:
```bash
git add src/config.js
git commit -m "Resolve merge conflict in config"
```

## Bước 7: Dùng stash
Mở `docs/changelog.md` và thêm:
```md
## v1.1.0
- Update environment config
```

Kiểm tra:
```bash
git status
```

Lưu tạm thay đổi:
```bash
git stash push -m "Update changelog draft"
```

Xem stash:
```bash
git stash list
```

Khôi phục stash:
```bash
git stash pop
```

## Bước 8: Dùng rebase
Tạo branch mới từ `main`:
```bash
git switch main
git switch -c feature/utils-improvement
```

Mở `src/utils.js` và sửa thành:
```javascript
export function formatMessage(msg) {
  return `[SYSTEM] ${msg}`;
}
```

Commit:
```bash
git add src/utils.js
git commit -m "Improve message format"
```

Quay lại `main`, sửa `README.md` hoặc file khác rồi commit một thay đổi mới:
```bash
git switch main
```

Ví dụ:
```bash
git add README.md
git commit -m "Update setup guide"
```

Quay lại branch tính năng:
```bash
git switch feature/utils-improvement
git rebase main
```

Xem lịch sử:
```bash
git log --oneline --graph --all
```

## Bước 9: Hoàn tác thay đổi an toàn
### Khôi phục file chưa commit
```bash
git restore README.md
```

### Tạo commit đảo ngược
```bash
git revert HEAD
```

### Reset cục bộ
```bash
git reset --soft HEAD~1
```

> Cẩn thận với `reset`, đặc biệt khi làm việc nhóm.

## Yêu cầu nộp bài
Nộp các nội dung sau:
1. link repo remote
2. ảnh conflict trước và sau khi xử lý
3. ảnh `git log --oneline --graph --all`
4. mô tả ngắn sự khác nhau giữa:
   - `fetch` và `pull`
   - `merge` và `rebase`
   - `revert` và `reset`

## Câu hỏi tự kiểm tra
1. Vì sao `revert` thường an toàn hơn `reset` khi làm việc nhóm?
2. Khi nào nên dùng `stash`?
3. Tại sao rebase có thể làm lịch sử commit “gọn” hơn?
4. Vì sao không nên `push --force` lên branch dùng chung?
