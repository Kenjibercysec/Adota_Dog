export interface User {
  id: string
  nome: string
  email: string
  senha: string
  endereco: string
  telefone: string
  cpf: string
  nascimento: string
}

export interface Dog {
  id: string
  nome: string
  raca: string
  fase: string
  sexo: string
  idade: string
  cor: string
  endereco: string
  descricao: string
  image: string
  treinadoCasa: boolean
  petAmigavel: boolean
  doadorId: string
}

export interface Visit {
  id: string
  dogId: string
  nome: string
  email: string
  telefone: string
  cpf: string
  data: string
  observacoes: string
  userId: string
}

export interface Message {
  id: string
  dogId: string
  senderId: string
  senderName: string
  text: string
  timestamp: number
}

// Storage keys
const USERS_KEY = "adotadog_users"
const DOGS_KEY = "adotadog_dogs"
const VISITS_KEY = "adotadog_visits"
const MESSAGES_KEY = "adotadog_messages"
const CURRENT_USER_KEY = "adotadog_current_user"

// Initialize with sample data
export function initializeStorage() {
  if (typeof window === "undefined") return

  // Initialize users
  if (!localStorage.getItem(USERS_KEY)) {
    const sampleUsers: User[] = [
      {
        id: "1",
        nome: "João Silva",
        email: "joao@email.com",
        senha: "123456",
        endereco: "Rua das Flores, 123",
        telefone: "(11) 98765-4321",
        cpf: "123.456.789-00",
        nascimento: "1990-01-01",
      },
    ]
    localStorage.setItem(USERS_KEY, JSON.stringify(sampleUsers))
  }

  // Initialize dogs
  if (!localStorage.getItem(DOGS_KEY)) {
    const sampleDogs: Dog[] = [
      {
        id: "1",
        nome: "Toby",
        raca: "Golden Retriever",
        fase: "Filhote",
        sexo: "Macho",
        idade: "5 meses",
        cor: "Malhado",
        endereco: "São Paulo, SP",
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla urna nec lacus pretium consectetur. Nullam a malesuada risus, ut.",
        image: "/images/adoption-20banner.png",
        treinadoCasa: true,
        petAmigavel: true,
        doadorId: "1",
      },
      {
        id: "2",
        nome: "Luna",
        raca: "Golden Retriever",
        fase: "Adulto",
        sexo: "Fêmea",
        idade: "3 anos",
        cor: "Dourado",
        endereco: "Rio de Janeiro, RJ",
        descricao: "Luna é uma cachorrinha muito carinhosa e adora brincar. Perfeita para famílias com crianças.",
        image: "/images/main-20banner-2.png",
        treinadoCasa: true,
        petAmigavel: true,
        doadorId: "1",
      },
    ]
    localStorage.setItem(DOGS_KEY, JSON.stringify(sampleDogs))
  }

  // Initialize visits
  if (!localStorage.getItem(VISITS_KEY)) {
    localStorage.setItem(VISITS_KEY, JSON.stringify([]))
  }

  // Initialize messages
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify([]))
  }
}

// User operations
export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(USERS_KEY)
  return data ? JSON.parse(data) : []
}

export function createUser(user: Omit<User, "id">): User {
  const users = getUsers()
  const newUser: User = { ...user, id: Date.now().toString() }
  users.push(newUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))
  return newUser
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers()
  return users.find((u) => u.email === email)
}

export function loginUser(email: string, senha: string): User | null {
  const user = getUserByEmail(email)
  if (user && user.senha === senha) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    return user
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(CURRENT_USER_KEY)
  return data ? JSON.parse(data) : null
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) return null

  users[index] = { ...users[index], ...updates }
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

  const currentUser = getCurrentUser()
  if (currentUser && currentUser.id === id) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]))
  }

  return users[index]
}

// Dog operations
export function getDogs(): Dog[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(DOGS_KEY)
  return data ? JSON.parse(data) : []
}

export function getDogById(id: string): Dog | undefined {
  const dogs = getDogs()
  return dogs.find((d) => d.id === id)
}

export function createDog(dog: Omit<Dog, "id">): Dog {
  const dogs = getDogs()
  const newDog: Dog = { ...dog, id: Date.now().toString() }
  dogs.push(newDog)
  localStorage.setItem(DOGS_KEY, JSON.stringify(dogs))
  return newDog
}

export function updateDog(id: string, updates: Partial<Dog>): Dog | null {
  const dogs = getDogs()
  const index = dogs.findIndex((d) => d.id === id)
  if (index === -1) return null

  dogs[index] = { ...dogs[index], ...updates }
  localStorage.setItem(DOGS_KEY, JSON.stringify(dogs))
  return dogs[index]
}

export function deleteDog(id: string): boolean {
  const dogs = getDogs()
  const filtered = dogs.filter((d) => d.id !== id)
  if (filtered.length === dogs.length) return false

  localStorage.setItem(DOGS_KEY, JSON.stringify(filtered))
  return true
}

export function searchDogs(query: string): Dog[] {
  const dogs = getDogs()
  const lowerQuery = query.toLowerCase()
  return dogs.filter(
    (dog) =>
      dog.nome.toLowerCase().includes(lowerQuery) ||
      dog.raca.toLowerCase().includes(lowerQuery) ||
      dog.endereco.toLowerCase().includes(lowerQuery),
  )
}

export function getUserDogs(userId: string): Dog[] {
  const dogs = getDogs()
  return dogs.filter((d) => d.doadorId === userId)
}

// Visit operations
export function getVisits(): Visit[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(VISITS_KEY)
  return data ? JSON.parse(data) : []
}

export function createVisit(visit: Omit<Visit, "id">): Visit {
  const visits = getVisits()
  const newVisit: Visit = { ...visit, id: Date.now().toString() }
  visits.push(newVisit)
  localStorage.setItem(VISITS_KEY, JSON.stringify(visits))
  return newVisit
}

// Message operations
export function getMessages(dogId: string): Message[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(MESSAGES_KEY)
  const allMessages: Message[] = data ? JSON.parse(data) : []
  return allMessages.filter((m) => m.dogId === dogId)
}

export function sendMessage(message: Omit<Message, "id" | "timestamp">): Message {
  if (typeof window === "undefined") throw new Error("Cannot send message on server")

  const data = localStorage.getItem(MESSAGES_KEY)
  const messages: Message[] = data ? JSON.parse(data) : []

  const newMessage: Message = {
    ...message,
    id: Date.now().toString(),
    timestamp: Date.now(),
  }

  messages.push(newMessage)
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  return newMessage
}
