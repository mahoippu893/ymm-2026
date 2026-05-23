export type PageDataItem = {
  name: string
  message: string
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current)
      current = ''
    } else {
      current += char
    }
  }

  fields.push(current)
  return fields
}

function normalizeMessage(message: string) {
  return message.replace(/<br\s*\/?>/gi, '\n')
}

export function parsePageCsv(text: string): PageDataItem[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const fields = parseCsvLine(line)
      if (fields.length < 2 || fields.slice(1).join(',').trim().length === 0) return null

      return {
        name: fields[0].trim(),
        message: normalizeMessage(fields.slice(1).join(',').trim()),
      }
    })
    .filter((item): item is PageDataItem => item !== null)
}

export function shuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}