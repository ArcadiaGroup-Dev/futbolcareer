import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { NewsService } from "./news.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateNewsDto, UpdateNewsDto } from "./dto/createnews.dto";

@ApiTags('News')
@Controller('News')
export class NewsController{
    constructor( private NewsService: NewsService){}

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crear una noticia' })
    @ApiResponse({ status: 201, description: 'Noticia creado exitosamente' })
    @ApiResponse({ status: 403, description: 'Prohibido' })
    @UseGuards(AuthGuard)
    createNews(@Body() createNewsDto: CreateNewsDto) {
      return this.NewsService.createNews(createNewsDto);
    }
    
    @Get()
    @ApiOperation({ summary: 'Obtener noticias paginadas' })    
    @ApiResponse({ status: 200, description: 'Noticias paginadas' })
    getNews(@Query('page') page = 1) {
    const pageNumber = Number(page) || 1;
    const limit = 10;
    return this.NewsService.findAllPaginated(pageNumber, limit);
}
    
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una noticia especifica' })
    @ApiResponse({ status: 200, description: 'Noticia' })
    @ApiResponse({ status: 404, description: 'Noticia no encontrado' })
    getNewsById(@Param('id') id: string) {
        return this.NewsService.findById(id);
    }
    
    @Put(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar una noticia' })
    @ApiResponse({ status: 200, description: 'Noticia actualizada exitosamente' })
    @ApiResponse({ status: 403, description: 'Prohibido' })
    @UseGuards(AuthGuard)
    updateNews(
        @Param('id') id: string,
        @Body() updateNewsDto: UpdateNewsDto,
      ) {
        return this.NewsService.updateNews(id, updateNewsDto);
    }
    
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar una noticia' })
    @ApiResponse({ status: 200, description: 'Noticia eliminada exitosamente' })
    @ApiResponse({ status: 403, description: 'Prohibido' })
    @UseGuards(AuthGuard)
    deleteNews(@Param('id') id: string,) {
        return this.NewsService.deleteNews(id);
    }

}