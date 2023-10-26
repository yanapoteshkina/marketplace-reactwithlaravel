<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Comments::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required',
            'content' => 'required'
        ]);

        $comments = Comments::create($validated);
        
        return $comments; 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function show(Comments $comments, $product_id)
    {
        // $comment = DB::table('comments as all_c')
        // ->where('all_c.product_id', '=', $product_id)
        // ->join('comments as repl_c', 'all_c.id', '=', 'repl_c.reply_id')
        // ->select('all_c.* AS menu_name_parent', 'B.menu_name__v1 AS menu_name_child')
        // ->get();
        // // $users = DB::table('all_menus as A')
        // // ->join('all_menus as B', 'A.id', '=', 'B.parent_menu_id__v1')
        // // ->toSql();

        $comment = Comments::with('replies')->where('product_id', '=', $product_id)->get();
        return $comment;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $comments = Comments::find($id);

        $comments->update($request->all());

        return  $comments;  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comments = Comments::find($id);

        $comments->delete();
        return   $comments; 
    }
}
