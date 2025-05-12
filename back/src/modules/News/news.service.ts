import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News } from "./entities/news.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto/createnews.dto";



@Injectable()
export class NewsService{
    constructor(@InjectRepository(News) private newsRepository: Repository<News>){}

    async findAll(): Promise<News[]>{
        return this.newsRepository.find()
    }

 async findAllPaginated(page: number, limit: number): Promise<{ data: News[], totalPages: number }> {
    const [data, total] = await this.newsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: {
            createdAt: 'DESC',  // Ordena por la fecha de creación de manera descendente
        },
    });

    const totalPages = Math.ceil(total / limit); // Calcula el total de páginas

    return {
        data,
        totalPages,
    };
}


    async findById(id:string): Promise <News>{
        
        const news = await this.newsRepository.findOne({
            where: {id}
        });
        if(!news){
            throw new NotFoundException(`Noticias con el  id ${id}`)
        }
        return news;
    }

    async createNews(createNewsDto: CreateNewsDto): Promise<News>{
        try{
            const news = this.newsRepository.create({...createNewsDto});
            console.log('Noticia creada', news);
            return await this.newsRepository.save(news)
        }
        catch(error){
            console.error('Error al crear la noticia: ', error)
            throw new Error('No se pudo crear la noticia')
        }
    }

    async updateNews(id:string, updateNewsDto: UpdateNewsDto): Promise<News>{

        const news = await this.newsRepository.findOne({where:{id}})
        if(!news){
            throw new NotFoundException(`Noticias con el  id ${id}`)
        }
        Object.assign(news, updateNewsDto);
        return await this.newsRepository.save(news)

    }

    async deleteNews(id:string) :Promise<News>{
        const news = await this.newsRepository.findOne({where:{id}})
        if(!news){
            throw new NotFoundException(`Noticias con el  id ${id}`)
        }
        return await this.newsRepository.remove(news)
    }
}

