const calendarContainer = document.querySelector('.calendar-container');
let selectedDateElement = null; // Armazena o elemento da data selecionada
let currentDate = new Date(); // Armazena a data atual

function atualizarMesAno() {
    const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const elementoMes = document.querySelector('.month');
    elementoMes.textContent = `${nomesMeses[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

function gerarCalendario() {
    const corpoCalendario = document.querySelector('.calendar tbody');
    corpoCalendario.innerHTML = ''; // Limpa o calendário

    const primeiroDia = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const ultimoDia = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let data = 1;
    for (let i = 0; i < 6; i++) { // 6 semanas no mês
        let linha = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let celula = document.createElement('td');

            if (i === 0 && j < primeiroDia) {
                celula.classList.add('inactive');
            } else if (data > ultimoDia) {
                break;
            } else {
                let diaSelecionado = data; // Captura o valor do dia no momento da criação
                celula.textContent = data;

                // Destaca a data ao ser clicada
                celula.addEventListener('click', function () {
                    if (selectedDateElement) {
                        selectedDateElement.classList.remove('selected');
                    }
                    celula.classList.add('selected');
                    selectedDateElement = celula;

                    const mensagemDataSelecionada = document.getElementById('selected-date-message');
                    mensagemDataSelecionada.textContent = `Você selecionou: ${diaSelecionado}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
                });

                data++;
            }
            linha.appendChild(celula);
        }
        corpoCalendario.appendChild(linha);
    }
}

//  animação
document.getElementById('prev-month').addEventListener('click', function () {
    document.querySelector('.calendar tbody').classList.add('saindo-prox');
    setTimeout(() => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        atualizarMesAno();
        gerarCalendario();
        document.querySelector('.calendar tbody').classList.remove('saindo-prox');
        document.querySelector('.calendar tbody').classList.add('entrando-ante');
        setTimeout(() => {
            document.querySelector('.calendar tbody').classList.remove('entrando-ante');
        }, 500);
    }, 500);
});

document.getElementById('next-month').addEventListener('click', function () {
    document.querySelector('.calendar tbody').classList.add('saindo-ante');
    setTimeout(() => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        atualizarMesAno();
        gerarCalendario();
        document.querySelector('.calendar tbody').classList.remove('saindo-ante');
        document.querySelector('.calendar tbody').classList.add('entrando-prox');
        setTimeout(() => {
            document.querySelector('.calendar tbody').classList.remove('entrando-prox');
        }, 500);
    }, 500);
});

class MobileNavbar {
    constructor(mobileMenu, navList, navLink) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navlist = document.querySelector(navList);
        this.navLink = document.querySelectorAll(navLink);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLink.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }

    handleClick() {
        this.navlist.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);

atualizarMesAno();
gerarCalendario();
function menuOpen() {
    const menuid = document.getElementById('menu-opcoes');
    
    if (menuid.style.display === "none" || menuid.style.display === "") { 
        menuid.style.display = "flex"; 
    } else {
        menuid.style.display = "none"; 
    }
}
function escuro() {
    const body = document.getElementById("body");
    const menu = document.getElementsByClassName(".mobile-menu")
    body.style.backgroundColor = "#000000"; 
    menu.style.background = "#000000";
}
function claro(){
    const body = document.getElementById("body");
    body.style.backgroundColor = " #b8b0e6"; 
}


